---
date: 2026-07-04
---

# 统计

---

**参考书：Statistical Inference**

---

## Principles of Data Reduction

---

A **sufficient statistic** for a parameter $\theta$ is a statistic that, in a certain sense, captures all the information about $\theta$ contained in the sample. Any additional information in the sample, besides the value of the sufficient statistic, does not contain any more information about $\theta$.

A statistic $T(\bm{X})$ is a **sufficient statistic for $\theta$** if the conditional distribution of the sample $\bm{X}$ given $T(\bm{X})$ does not depend on $\theta$. 

We need to show that $\bm{X}$ and $\bm{Y}$ have the same unconditional distribution, where $\bm{Y}$ is a random vector with the same distribution as $\bm{X}$, but independent of $T(\bm{X})$. That is $P_\theta(\bm{X}=\bm{x}) = P_\theta(\bm{Y}=\bm{x})$ for all $\bm{x}$ and $\theta$. Note that the events $\{\bm{X}=\bm{x}\}$ and $\{\bm{Y}=\bm{x}\}$ are both subsets of the event $\{T(\bm{X})=T(\bm{x})\}$. Also recall that

$$
P_\theta(\bm{X}=\bm{x}|T(\bm{X})=T(\bm{x}))=P_\theta(\bm{Y}=\bm{x}|T(\bm{X})=T(\bm{x}))
$$

and these conditional probabilities do not depend on $\theta$. Therefore, we have

$$
\begin{aligned}
P_\theta(\bm{X}=\bm{x}) &= P_\theta(\bm{X}=\bm{x} \text{ and } T(\bm{X})=T(\bm{x})) \\
&= P_\theta(\bm{X}=\bm{x}|T(\bm{X})=T(\bm{x}))P_\theta(T(\bm{X})=T(\bm{x})) \\
&= P_\theta(\bm{Y}=\bm{x}|T(\bm{X})=T(\bm{x}))P_\theta(T(\bm{X})=T(\bm{x})) \\
&= P_\theta(\bm{Y}=\bm{x} \text{ and } T(\bm{X})=T(\bm{x})) \\
&= P_\theta(\bm{Y}=\bm{x})
\end{aligned}
$$

So we must verify only that $P_\theta(\bm{X}=\bm{x}|T(\bm{X})=T(\bm{x}))$ does not depend on $\theta$.

$$
\begin{aligned}
P_\theta(\bm{X}=\bm{x}|T(\bm{X})=T(\bm{x})) &= \frac{P_\theta(\bm{X}=\bm{x}) \text{ and } T(\bm{X})=T(\bm{x}))}{P_\theta(T(\bm{X})=T(\bm{x})) }\\
&= \frac{P_\theta(\bm{X}=\bm{x})}{P_\theta(T(\bm{X})=T(\bm{x})) }\\
&= \frac{p(\bm{x}|\theta)}{q(T(\bm{x})|\theta)}
\end{aligned}
$$

where $p(\bm{x}|\theta)$ is the joint pmf of the sample $\bm{X}$ and $q(t|\theta)$ is the pmf of $T(\bm{X})$. 

**Theorem 6.2.2** If $p(\bm{x}|\theta)$ is the joint pdf or pmf of $\bm{X}$, and  $q(t|\theta)$  is the pdf or pmf of $T(\bm{X})$, then $T(\bm{X})$ is a sufficient statistic for $\theta$ if, for every $\bm{x}$ in the sample space, the ratio $p(\bm{x}|\theta)/q(T(\bm{x})|\theta)$ is constant as a function of $\theta$.

**Factorization Theorem** Let $f(\bm{x}|\theta)$ denote the joint pdf or pmf of a sample $\bm{X}$. A statistic $T(\bm{X})$ is a sufficient statistic for $\theta$ if and only if there exist functions $g(t|\theta)$ and $h(\bm{x})$ such that, for all sample points $\bm{x}$ and all parameter values $\theta$,

$$
f(\bm{x}|\theta) = g(T(\bm{x})|\theta)h(\bm{x})
$$

**Theorem 6.2.10** Let $X_1, X_2, \cdots, X_n$ be iid observations from a pdf or pmf $f(x|\theta)$ that belongs to an exponential family given by

$$
f(x|\theta)=h(x)c(\theta)\exp\left\{\sum_{i=1}^k w_i(\theta)t_i(x)\right\}
$$

where $\bm{\theta}=(\theta_1, \cdots, \theta_d),d\le k$. Then

$$
T(\bm{X})=\left(\sum_{i=1}^n t_1(X_i), \cdots, \sum_{i=1}^n t_k(X_i)\right)
$$

is a sufficient statistic for $\bm{\theta}$.

A sufficient statistic $T(\bm{X})$ is called a **minimal sufficient statistic** if, for any other sufficient statistic $T'(\bm{X})$, $T(\bm{X})$ is a function of $T'(\bm{X})$. 

**Theorem 6.2.13** Let $f(\bm{x}|\theta)$ be the pmf or pdf of a sample $\bm{X}$. Suppose there exists a function $T(\bm{x})$ such that, for every two sample points $\bm{x}$ and $\bm{y}$, the ratio $f(\bm{x}|\theta)/f(\bm{y}|\theta)$ is constant as a function of $\theta$ iff $T(\bm{x})=T(\bm{y})$. Then $T(\bm{X})$ is a minimal sufficient statistic for $\theta$.

A statistic $S(\bm{X})$ whose distribution does not depend on the parameter $\theta$ is called an **ancillary statistic**.

Let $f(t|\theta)$ be a family of pdfs or pmfs for a statistic $T(\bm{X})$. The family of probability distributions is called **complete** if $E_\theta[g(T)] = 0$ for all $\theta$ implies $P_\theta(g(T)=0)=1$ for all $\theta$. Equivalently, $T(\bm{X})$ is called a **complete statistic**.

**Basu's Theorem** If $T(\bm{X})$ is a complete and minimal sufficient statistic, then $T(\bm{X})$ is independent of every ancillary statistic.

**Complete statistics in the exponential family** Let $X_1, X_2, \cdots, X_n$ be iid observations from an exponential family with pdf or pmf of the form 

$$
f(x|\bm{\theta})=h(x)c(\bm{\theta})\exp\left\{\sum_{j=1}^k w(\theta_j)t_j(x)\right\}
$$

where $\bm{\theta}=(\theta_1, \cdots, \theta_k)$, Then the statistic

$$
T(\bm{X})=\left(\sum_{i=1}^n t_1(X_i), \cdots, \sum_{i=1}^n t_k(X_i)\right)
$$

is complete as long as the parameter space $\Theta$ contains an open set in $\mathbb{R}^k$.

**Theorem 6.2.28** If a minimal sufficient statistic exists, then any complete statistic is also a minimal sufficient statistic.

---

## Point Estimation

---

A **point estimator** is any function $W(X_1, \cdots, X_n)$ of a sample; that is, any statistic is a point estimator. 

---

**The method of moments** is a technique for constructing point estimators by equating sample moments to population moments.

Let $X_1, X_2, \cdots, X_n$ be a sample from a population with pdf or pmf $f(x|\theta)$. Define

$$
\begin{aligned}
m_1=\frac{1}{n}\sum_{i=1}^n X_i^1,& \quad \mu'_1=EX^1,\\
m_2=\frac{1}{n}\sum_{i=1}^n X_i^2,& \quad \mu'_2=EX^2,\\
\vdots& \\
m_k=\frac{1}{n}\sum_{i=1}^n X_i^k,& \quad \mu'_k=EX^k.
\end{aligned}
$$

The population moments $\mu'_j$ will typically be a function of $\theta_1,\cdots,\theta_k$, say $\mu'_j(\theta_1,\cdots,\theta_k)$. The method of moments estimator $(\hat{\theta}_1, \cdots, \hat{\theta}_k)$ of $(\theta_1, \cdots, \theta_k)$ is obtained by solving the following system of equations for $(\theta_1, \cdots, \theta_k)$ in terms of $(m_1, \cdots, m_k)$:

$$
\begin{aligned}
m_1&=\mu'_1(\theta_1, \cdots, \theta_k),\\
m_2&=\mu'_2(\theta_1, \cdots, \theta_k),\\
\vdots& \\
m_k&=\mu'_k(\theta_1, \cdots, \theta_k).
\end{aligned}
$$

---

**The method of maximum likelihood** is a technique for constructing point estimators by maximizing the likelihood function, that if $X_1, \cdots, X_n$ is a sample from a population with pdf or pmf $f(x|\theta_1,\cdots,\theta_k)$, then the likelihood function is defined by

$$
L(\theta|\bm{x})=L(\theta_1, \cdots, \theta_k|x_1, \cdots, x_n)=\prod_{i=1}^n f(x_i|\theta_1, \cdots, \theta_k)
$$

For each sample point $\bm{x}$, let $\hat{\theta}(\bm{x})$ be a parameter value at which $L(\theta|\bm{x})$ attains its maximum as a function of $\theta$, with $\bm{x}$ held fixed. A **maximum likelihood estimator (MLE)** of the parameter $\theta$ based on a sample $\bm{X}$ is $\hat{\theta}(\bm{X})$.

**Theorem 7.2.10** If $\hat{\theta}$ is the MLE of $\theta$, then for any function $\tau(\theta)$, the MLE of $\tau(\theta)$ is $\tau(\hat{\theta})$.

---

**The EM(Expectation-Maximization) algorithm** is an iterative method for finding MLEs when the data is incomplete or has missing values. It consists of two steps: the E-step, where we compute the expected value of the log-likelihood function with respect to the current estimate of the parameters, and the M-step, where we maximize this expected log-likelihood to update our parameter estimates.

The EM algorithm allows us to maximize $L(\theta|\bm{y})$ by working with only $L(\theta|\bm{y},\bm{x})$ and the conditional pdf or pmf of $\bm{X}$ given $\bm{y}$ and $\theta$ defined by

$$
L(\theta|\bm{x},\bm{y})=f(\bm{y},\bm{x}|\theta),\quad L(\theta|\bm{y})=g(\bm{y}|\theta),\quad k(\bm{x}|\theta,\bm{y})=\frac{f(\bm{y},\bm{x}|\theta)}{g(\bm{y}|\theta)}
$$

which gives the identity

$$
\log L(\theta|\bm{y}) = \log L(\theta|\bm{x},\bm{y}) - \log k(\bm{x}|\theta,\bm{y})
$$

As $\bm{x}$ is missing data and hence not observed, we replace the riht side of above with its expection under $k(\bm{x}|\theta',\bm{y})$:

$$
\log L(\theta|\bm{y}) = E[\log L(\theta|\bm{y},\bm{X})|\theta',\bm{y}] - E[\log k(\bm{X}|\theta,\bm{y})|\theta',\bm{y}]
$$

From an initial value $\theta^{(0)}$, we can create a sequence $\theta^{(r)}$ according to 

$$
\theta^{(r+1)} = \arg\max_\theta E[\log L(\theta|\bm{y},\bm{X})|\theta^{(r)},\bm{y}]
$$

**Theorem 7.2.20** The sequence $\left\{\hat{\theta}^{(r)}\right\}$ defined by above satisfies

$$
L(\hat{\theta}^{(r+1)}|\bm{y}) \ge L(\hat{\theta}^{(r)}|\bm{y})
$$

with equality holding iff successive iterations yield the same value of the maximized expected complete-data log likelihood, that is

$$
E[\log L(\hat{\theta}^{(r+1)}|\bm{y},\bm{X})|\hat{\theta}^{(r)},\bm{y}] = E[\log L(\hat{\theta}^{(r)}|\bm{y},\bm{X})|\hat{\theta}^{(r)},\bm{y}]
$$

---

The **mean squared error (MSE)** of an estimator $W$ of a parameter $\theta$ is the function of $\theta$ defined by $E_\theta(W-\theta)^2$.

The **bias** of a point estimator $W$ of a parameter $\theta$ is defined by $\mathrm{Bias}_\theta(W)=E_\theta(W)-\theta$. An estimator is **unbiased** if $\mathrm{Bias}_\theta(W)=0$ for all $\theta$.

---

## Hypothesis Testing

---

A **hypothesis** is a statement about a population parameter.  

The goal of a hypothesis test is to decide, based on a sample from the population, which of two complementary hypotheses is true.

The two complementary hypotheses in a hypothesis testing problem are called the **null hypothesis** and the **alternative hypothesis**. They are denoted by $H_0$ and $H_1$, respectively. 

A **hypothesis testing procedure** or **hypothesis test** is a rule that specifies, 

1. For which sample values the decision is made to accept $H_0$ as true.

2. For which sample values $H_0$ is rejected and $H_1$ is accepted as true.

The subset of the sample space for which $H_0$ is rejected is called the **rejection region** or **critical region**. The complement of the rejection region is called the **acceptance region**.

---

Recall that if $X_1, \cdots, X_n$ is a random sample from a population with pdf or pmf $f(x|\theta)$, the likelihood function is defined as

$$
L(\theta|x_1,\cdots,x_n)=L(\theta|\bm{x})=f(x|\theta)=\prod_{i=1}^n f(x_i|\theta)
$$

Let $\Theta$ denote the entire parameter space. The **likelihood ratio test statistic** for testing $H_0:\theta\in\Theta_0$ versus $H_1:\theta\in\Theta_0^c$ is 

$$
\lambda(\bm{x})=\frac{\sup_{\theta\in\Theta_0}L(\theta|\bm{x})}{\sup_{\theta\in\Theta}L(\theta|\bm{x})}
$$

A **likelihood ratio test(LRT)** is any test that has a rejection region of the form $\left\{\bm{x}:\lambda(\bm{x})<c\right\}$, where $c$ is any number satisfying $0<c<1$. 

If $T(\bm{X})$ is a sufficient statistic for $\theta$ with pdf or pmf $g(t|\theta)$, then we might consider constructing an LRT based on $T$  and its likelihood function $L^*(\theta|t)=g(t|\theta)$, rather than on the sample $\bm{X}$ and its likelihood function $L(\theta|\bm{x})$. Let $\lambda^*(t)$ denote the likelihood ratio test statistic based on a sufficient statistic $T(\bm{X})$ for $\theta$. Then

**Theorem 8.2.4** If $T(\bm{X})$ is a sufficient statistic for $\theta$ and $\lambda^*(t)$ and $\lambda(\bm{x})$  are the LRT statistics based on T and $\bm{X}$, respectively, then $\lambda^*(T(\bm{X}))=\lambda(\bm{X})$ for all sample points $\bm{x}$.

---

Recall that a Bayesian model includes not only the sampling distribution $f(\bm{x}|\theta)$ but also the prior distribution $\pi(\theta)$, which reflects the experimenter's opinion about the parameter $\theta$ prior to sampling. The sample information is combined with the prior information using Bayes' Theorem to obtain the **posterior distribution** $\pi(\theta|\bm{x})$. All inferences about $\theta$ are based on this posterior distribution.

In a hypothesis testing problem for testing $H_0:\theta\in\Theta_0$ versus $H_1:\theta\in\Theta_0^c$, the posterior distribution is used to calculate the posterior probabilities that $H_0$ and $H_1$ are true:

$$
P(\theta \in \Theta_0|\bm{x}) \quad \text{and} \quad P(\theta \in \Theta_0^c|\bm{x})
$$

Unlike classical statistics, these probabilities depend on the sample $\bm{x}$ and provide direct information about the veracity of $H_0$ and $H_1$.

A standard **Bayesian hypothesis test** accepts $H_0$ as true if $P(\theta \in \Theta_0|\bm{X}) \geq P(\theta \in \Theta_0^c|\bm{X})$. Thus, the test has a rejection region of the form

$$
\left\{\bm{x}: P(\theta \in \Theta_0^c|\bm{x}) > c\right\}
$$

where $c = \frac{1}{2}$. Alternatively, if the tester wishes to guard against falsely rejecting $H_0$, $c$ can be set to a larger number, such as $0.99$.

**Example 8.2.7 (Normal Bayesian test)** Let $X_1, \cdots, X_n$ be iid $n(\theta, \sigma^2)$ and let the prior distribution on $\theta$ be $n(\mu, \tau^2)$, where $\sigma^2, \mu$, and $\tau^2$ are known. Consider testing $H_0: \theta \leq \theta_0$ versus $H_1: \theta > \theta_0$. The posterior $\pi(\theta|\bar{x})$ is normal with mean $(n\tau^2\bar{x} + \sigma^2\mu)/(n\tau^2 + \sigma^2)$.

We accept $H_0$ if and only if $P(\theta \leq \theta_0|\bm{X}) \geq \frac{1}{2}$. Since $\pi(\theta|\bm{x})$ is symmetric, this holds true if and only if the posterior mean is less than or equal to $\theta_0$. Therefore, $H_0$ will be accepted as true if

$$
\bar{X} \leq \theta_0 + \frac{\sigma^2(\theta_0 - \mu)}{n\tau^2}
$$

---

A hypothesis test of $H_0: \theta \in \Theta_0$ versus $H_1: \theta \in \Theta_0^c$ might make one of two types of errors:

1. **Type I Error:** Rejecting $H_0$ when $\theta \in \Theta_0$ (i.e., $H_0$ is true).

2.  **Type II Error:** Accepting $H_0$ when $\theta \in \Theta_0^c$ (i.e., $H_1$ is true).

If $R$ denotes the rejection region for a test, the probability of a Type I Error is $P_\theta(\bm{X} \in R)$ for $\theta \in \Theta_0$, and the probability of a Type II Error is $P_\theta(\bm{X} \in R^c)$ for $\theta \in \Theta_0^c$.

The **power function** of a hypothesis test with rejection region $R$ is the function of $\theta$ defined by $\beta(\theta) = P_\theta(\bm{X} \in R)$.

For $0 \leq \alpha \leq 1$, a test with power function $\beta(\theta)$ is a **size $\alpha$ test** if $\sup_{\theta \in \Theta_0} \beta(\theta) = \alpha$.

For $0 \leq \alpha \leq 1$, a test with power function $\beta(\theta)$ is a **level $\alpha$ test** if $\sup_{\theta \in \Theta_0} \beta(\theta) \leq \alpha$.

A test with power function $\beta(\theta)$ is **unbiased** if $\beta(\theta') \geq \beta(\theta'')$ for every $\theta' \in \Theta_0^c$ and $\theta'' \in \Theta_0$.

---

Let $\mathcal{C}$ be a class of tests for testing $H_0: \theta \in \Theta_0$ versus $H_1: \theta \in \Theta_0^c$. A test in class $\mathcal{C}$, with power function $\beta(\theta)$, is a **uniformly most powerful (UMP) class $\mathcal{C}$ test** if $\beta(\theta) \geq \beta'(\theta)$ for every $\theta \in \Theta_0^c$ and every $\beta'(\theta)$ that is a power function of a test in class $\mathcal{C}$.

*(Note: In this section, class $\mathcal{C}$ is usually the class of all level $\alpha$ tests, making the test a UMP level $\alpha$ test.)*

**Theorem 8.3.12 (Neyman–Pearson Lemma)** Consider testing simple hypotheses $H_0: \theta = \theta_0$ versus $H_1: \theta = \theta_1$, where the pdf or pmf corresponding to $\theta_i$ is $f(\mathbf{x}|\theta_i), i = 0, 1$, using a test with rejection region $R$ that satisfies:

$$
\mathbf{x} \in R \quad \text{if} \quad f(\mathbf{x}|\theta_1) > k f(\mathbf{x}|\theta_0)
$$

and

$$
\mathbf{x} \in R^c \quad \text{if} \quad f(\mathbf{x}|\theta_1) < k f(\mathbf{x}|\theta_0)
$$

for some $k \geq 0$, and

$$
\alpha = P_{\theta_0}(\mathbf{X} \in R).
$$

Then:

* **a. (Sufficiency)** Any test that satisfies the above conditions is a UMP level $\alpha$ test.
* **b. (Necessity)** If there exists a test satisfying these conditions with $k > 0$, then every UMP level $\alpha$ test is a size $\alpha$ test and satisfies the first two inequalities except perhaps on a set $A$ satisfying $P_{\theta_0}(\mathbf{X} \in A) = P_{\theta_1}(\mathbf{X} \in A) = 0$.

**Corollary 8.3.13** Consider the hypothesis problem posed in Theorem 8.3.12. Suppose $T(\mathbf{X})$ is a sufficient statistic for $\theta$ and $g(t|\theta_i)$ is the pdf or pmf of $T$ corresponding to $\theta_i, i = 0, 1$. Then any test based on $T$ with rejection region $S$ (a subset of the sample space of $T$) is a UMP level $\alpha$ test if it satisfies:

$$
t \in S \quad \text{if} \quad g(t|\theta_1) > k g(t|\theta_0)
$$

and

$$
t \in S^c \quad \text{if} \quad g(t|\theta_1) < k g(t|\theta_0)
$$

for some $k \geq 0$, where $\alpha = P_{\theta_0}(T \in S)$.

---

**Terminology for Hypotheses:**

* **Simple hypotheses:** Hypotheses that specify only one possible distribution for the sample (e.g., $H_0: \theta = \theta_0$).

* **Composite hypotheses:** Hypotheses that specify more than one possible distribution (e.g., $H_0: \theta \leq \theta_0$).

* **One-sided hypotheses:** Assert that a parameter is large ($H: \theta \geq \theta_0$) or small ($H: \theta < \theta_0$).

* **Two-sided hypotheses:** Assert that a parameter is large or small ($H: \theta \neq \theta_0$).

A family of pdfs or pmfs $\{g(t|\theta): \theta \in \Theta\}$ for a univariate random variable $T$ with real-valued parameter $\theta$ has a **monotone likelihood ratio (MLR)** if, for every $\theta_2 > \theta_1$, $g(t|\theta_2)/g(t|\theta_1)$ is a monotone (nonincreasing or nondecreasing) function of $t$ on $\{t: g(t|\theta_1) > 0 \text{ or } g(t|\theta_2) > 0\}$. (Note that $c/0$ is defined as $\infty$ if $0 < c$.)

**Theorem 8.3.17 (Karlin–Rubin)** Consider testing $H_0: \theta \leq \theta_0$ versus $H_1: \theta > \theta_0$. Suppose that $T$ is a sufficient statistic for $\theta$ and the family of pdfs or pmfs $\{g(t|\theta): \theta \in \Theta\}$ of $T$ has an MLR. Then for any $t_0$, the test that rejects $H_0$ if and only if $T > t_0$ is a UMP level $\alpha$ test, where $\alpha = P_{\theta_0}(T > t_0)$.

---

A p-value $p(\mathbf{X})$ is a test statistic satisfying $0 \le p(\mathbf{x}) \le 1$ for every sample point $\mathbf{x}$. A p-value is **valid** if, for all $\theta \in \Theta_0$ and all $0 \le \alpha \le 1$:

$$
P_\theta(p(\mathbf{X}) \le \alpha) \le \alpha
$$

If a test is defined by rejecting $H_0$ when $p(\mathbf{X}) \le \alpha$, the validity condition (8.3.8) ensures that it is a level $\alpha$ test.

**Theorem 8.3.27** Let $W(\mathbf{X})$ be a test statistic such that large values of $W(\mathbf{X})$ provide evidence against $H_0$. For each sample point $\mathbf{x}$, define:

$$
p(\mathbf{x}) = \sup_{\theta \in \Theta_0} P_\theta(W(\mathbf{X}) \ge W(\mathbf{x}))
$$

Then $p(\mathbf{X})$ is a valid p-value.

In cases where calculating the supremum is analytically difficult, one can construct a valid p-value by conditioning on a sufficient statistic under $H_0$.

Let $S(\mathbf{X})$ be a statistic that is sufficient for $\theta$ when $\theta \in \Theta_0$. If the conditional distribution of $\mathbf{X}$ given $S=s$ does not depend on $\theta$ for any $\theta \in \Theta_0$, we can define the conditional p-value as:

$$
p(\mathbf{x}) = P(W(\mathbf{X}) \ge W(\mathbf{x}) | S = S(\mathbf{x}))
$$

This conditional p-value is also a valid p-value.