$ErrorActionPreference = "Stop"

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
Add-Type -AssemblyName System.Web

$articles = @(
    @{ Term = "2023-Fall";   Url = "https://qzc.tsinghua.edu.cn/info/1072/5467.htm" },
    @{ Term = "2024-Spring"; Url = "https://qzc.tsinghua.edu.cn/info/1072/5468.htm" },
    @{ Term = "2024-Fall";   Url = "https://qzc.tsinghua.edu.cn/info/1072/6359.htm" },
    @{ Term = "2025-Spring"; Url = "https://qzc.tsinghua.edu.cn/info/1072/6976.htm" },
    @{ Term = "2025-Fall";   Url = "https://qzc.tsinghua.edu.cn/info/1072/7558.htm" },
    @{ Term = "2026-Spring"; Url = "https://qzc.tsinghua.edu.cn/info/1072/8041.htm" }
)

$desktop = [Environment]::GetFolderPath("Desktop")
$root = Join-Path $desktop "Qiuzhen_QE_Exam_Papers"
New-Item -ItemType Directory -Path $root -Force | Out-Null

$headers = @{
    "User-Agent" = "Mozilla/5.0"
    "Referer" = "https://qzc.tsinghua.edu.cn/syzs/ktzy.htm"
}

function Get-PageText {
    param([string]$Url)

    $response = Invoke-WebRequest -Uri $Url -Headers $headers -UseBasicParsing
    if ($response.Content -is [byte[]]) {
        return [Text.Encoding]::UTF8.GetString($response.Content)
    }
    return [string]$response.Content
}

function Resolve-Link {
    param(
        [string]$PageUrl,
        [string]$Href
    )

    $decoded = [System.Web.HttpUtility]::HtmlDecode($Href).Trim()
    return ([Uri]::new([Uri]$PageUrl, $decoded)).AbsoluteUri
}

function Clean-Text {
    param([string]$Text)

    $withoutTags = [Regex]::Replace($Text, "<.*?>", "", "Singleline")
    $decoded = [System.Web.HttpUtility]::HtmlDecode($withoutTags)
    return ([Regex]::Replace($decoded, "\s+", " ")).Trim()
}

function Safe-FileName {
    param([string]$Name)

    $invalid = [IO.Path]::GetInvalidFileNameChars()
    $chars = $Name.ToCharArray() | ForEach-Object {
        if ($invalid -contains $_) { "_" } else { $_ }
    }
    return (-join $chars).Trim()
}

function Get-Subject {
    param([string]$FileName)

    $name = $FileName.ToLowerInvariant()

    if ($name -match "\bai\b|artificial intelligence") { return "Artificial Intelligence" }
    if ($name -match "algebra|number theory") { return "Algebra and Number Theory" }
    if ($name -match "analysis|differential equations") { return "Analysis and Differential Equations" }
    if ($name -match "geometry|topology|\bgt\b") { return "Geometry and Topology" }
    if ($name -match "probability|statistics") { return "Probability and Statistics" }
    if ($name -match "applied|computational") { return "Computational and Applied Mathematics" }
    if ($name -match "theoretical physics") { return "Theoretical Physics" }
    if ($name -match "mechanics|electrodynamics") { return "Mechanics" }
    if ($name -match "dynamics") { return "Dynamics" }
    if ($name -match "\bgr\b|general relativity") { return "General Relativity" }

    return "Other"
}

$linkPattern = '<a[^>]+href\s*=\s*["''](?<href>[^"'']+)["''][^>]*>(?<text>.*?)</a>'
$manifest = New-Object System.Collections.Generic.List[object]
$downloadCount = 0

foreach ($article in $articles) {
    $articleUrl = $article.Url
    $termTag = $article.Term
    $articleHtml = Get-PageText -Url $articleUrl

    foreach ($match in [Regex]::Matches($articleHtml, $linkPattern, "Singleline, IgnoreCase")) {
        $fileName = Clean-Text -Text $match.Groups["text"].Value
        $href = $match.Groups["href"].Value
        if ($fileName -notmatch "\.pdf$" -and $href -notmatch "\.pdf") {
            continue
        }

        if ($fileName -notmatch "\.pdf$") {
            $fileName = [IO.Path]::GetFileName(([Uri](Resolve-Link -PageUrl $articleUrl -Href $href)).AbsolutePath)
            $fileName = [Uri]::UnescapeDataString($fileName)
        }

        $subject = Get-Subject -FileName $fileName
        $subjectDir = Join-Path $root $subject
        New-Item -ItemType Directory -Path $subjectDir -Force | Out-Null

        $targetName = Safe-FileName -Name "$termTag - $fileName"
        $targetPath = Join-Path $subjectDir $targetName
        $fileUrl = Resolve-Link -PageUrl $articleUrl -Href $href

        Invoke-WebRequest -Uri $fileUrl -Headers $headers -OutFile $targetPath -UseBasicParsing
        $fileInfo = Get-Item -LiteralPath $targetPath
        if ($fileInfo.Length -lt 1000) {
            throw "Downloaded file is unexpectedly small: $targetPath"
        }

        $downloadCount++
        $manifest.Add([pscustomobject]@{
            Term = $termTag
            Subject = $subject
            FileName = $targetName
            SourcePage = $articleUrl
            SourceFile = $fileUrl
            SizeBytes = $fileInfo.Length
        }) | Out-Null
    }
}

$manifestPath = Join-Path $root "_download_manifest.csv"
$manifest | Sort-Object Subject, Term, FileName | Export-Csv -LiteralPath $manifestPath -NoTypeInformation -Encoding UTF8

Write-Host "Downloaded $downloadCount PDF files."
Write-Host "Saved to: $root"
Write-Host "Manifest: $manifestPath"
