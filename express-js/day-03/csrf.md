# CSRF (Cross-Site Request Forgery)

## Break it into words

- cross-Site → from another website
- Request → an HTTP request (POST / GET etc.)
- Forgery → fake / without your permission

So together:

> CSRF = a fake request sent from another website using your login

## Understanding using a real-life attack story.

### Step 1: First, one simple fact (very important)

👉 **Browsers automatically attach cookies to requests.**

**You don’t click anything** — browser still sends the cookie.

Keep this in mind.

---

### Step 2: The attack story (CSRF) 🎭

**Characters:**

- 👤 You (already logged in)
- 🏦 bank.com (trusted site)
- 😈 evil.com (attacker site)

---

### Step 3: What happens normally (safe)

1. You login to **bank.com**
2. Browser stores cookie: **sessionId=123**
3. You do actions → cookie goes → bank knows it’s you

All good ✅

---

### Step 4: Now the attack begins 😈

1. You are STILL logged in to **bank.com** ( Suppose if you logged out, Then in that case nothing gets happen. ❌CSRF fails )
2. You open a new tab: **evil.com**
3. Inside **evil.com** (hidden):

```
<form action="https://bank.com/transfer-money" method="POST">
  <input type="hidden" name="amount" value="10000" />
</form>

<script>document.forms[0].submit()</script>
```

You didn’t click anything 😨

---

### Step 5: Why this is dangerous

- Browser sees request to **bank.com**
- Browser _automatically attaches cookie_
- **bank.com** thinks:

> “Oh, valid user — request accepted”

💸 Money transferred

### THIS is CSRF 🔥

> CSRF = tricking the browser into sending a request with your cookie

You didn’t approve the action,  
but the server trusts the cookie.
