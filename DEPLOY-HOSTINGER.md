# Deploying to Hostinger

1. Log in to **hPanel** → **Websites** → your domain → **File Manager**.
2. Open the `public_html` folder and delete the default `default.php` / `index.php` if present.
3. Click **Upload**, choose `shivam-biolumina-website.zip`, then right-click it → **Extract** into `public_html`.
   (The files must sit directly in `public_html`, e.g. `public_html/index.html` — not in a sub-folder.)
4. Delete the zip after extracting.
5. Enable SSL: hPanel → **Security → SSL** → install the free SSL, then turn on **Force HTTPS**.

## Contact & newsletter forms
Forms submit to `contact.php`, which emails **shivambiolumina@gmail.com** using Hostinger's built-in PHP mail.
To change the recipient, edit the `$to` line at the top of `contact.php`.

For best inbox delivery, create a mailbox such as `noreply@yourdomain.com` in hPanel → **Emails**
(the form sends from `noreply@<your domain>`). Check the spam folder on the first test.
