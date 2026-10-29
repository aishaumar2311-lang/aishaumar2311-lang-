# Golden International School Academy — Official Website

A premium, fully responsive, production-ready static website. No build tools or
server software are required — simply upload the contents of this folder to any
web host (or open `index.html` in a browser).

## Pages
| File | Purpose |
|---|---|
| `index.html` | Homepage — hero, programs, about, why choose us, facilities, admissions banner, school life, news, gallery, FAQ |
| `about.html` | Our story, vision & mission, core values, leadership |
| `academics.html` | Early Years, Nursery, Primary & Secondary in detail |
| `admissions.html` | Admission steps, documents, visits, fees guidance, enquiry form |
| `school-life.html` | Activities, wellbeing, full photo gallery (with filters + lightbox) |
| `facilities.html` | Campus learning spaces |
| `news.html` | News & events with category filters |
| `contact.html` | Contact details, directions, general enquiry form |

Shared design: `assets/style.css` · Behaviour: `assets/script.js` ·
Logo: `assets/logo.svg` (also used as the browser favicon: `assets/favicon.svg`).
The SVG logo is infinitely scalable and suitable for the header, footer,
admission documents and social-media profiles.

---

## ⚠️ IMPORTANT: The supplied hero image
The homepage hero uses the **exact Cloudinary URL supplied by the school**
(`https://res.cloudinary.com/rksgoedz/image/upload/f_auto,q_auto/1000163069`).

However, please note: that file is the **full Oakridge reference-design
screenshot**, not a standalone school photograph. To use the exact URL *without*
displaying another school's branding, the hero image carries a CSS class
(`hero-crop` in `assets/style.css`) that art-directs the visible crop to the
student-photograph area of the supplied file only.

**Recommended final step:** replace it with a real photograph of Golden
International School Academy students/campus:
1. In `index.html`, find the hero `<img …>` (search for `hero-crop`).
2. Change its `src` to your real photo (ideally landscape, at least 1600×1200).
3. Change `class="hero-crop"` to `class="img-cover"`.
4. Update the `alt` text to describe the new photo.

If the hero image ever fails to load, a local fallback photo is shown
automatically so the layout never breaks.

---

## Things the school should update (search for these)
1. **Official email address** — currently shown as a highlighted placeholder
   (“To be added by the school”) in the footer and on the Contact page.
2. **Vision & Mission statements** — marked “Suggested Draft” on `about.html`
   until the officially approved wording is inserted. Also add the school’s
   founding story where the gold “School editor note” appears.
3. **Leadership profiles** — placeholder cards on `about.html` await real
   names, photographs and biographies.
4. **Program names / age ranges** — Early Years, Nursery, Primary and
   Secondary are editable placeholders. Rename or remove any stage that does
   not apply (`index.html` program cards + `academics.html` sections; anchors
   are `#early-years`, `#nursery`, `#primary`, `#secondary`).
5. **Facilities** — cards on `facilities.html` use clearly labelled *Sample
   Image* photography. Replace images in `assets/img/` with real photos and
   remove any facility the school does not have.
6. **Statistics** — the homepage band intentionally shows qualitative
   highlights (4 stages, 7 values, 6 areas of school life). When verified
   figures (students, teachers, years) are available, edit the
   `data-count` values in `index.html`.
7. **News articles** — posts marked *Sample Post* are demonstration content.
   Replace headlines, dates and images with real announcements in
   `news.html` (and the three preview cards in `index.html`).
8. **Parent testimonials** — the homepage shows an honest “coming soon”
   placeholder. Add real testimonials only with each parent’s written
   permission; never publish invented quotes.
9. **Gallery photos** — sample images in `assets/img/`. Publish only photos
   the school is authorised to use, with consent for images of children.

## Connecting the enquiry form (required before launch)
The forms validate entries (required fields, phone/email format, consent,
honeypot anti-spam) but **do not yet send anywhere** — and they say so
honestly instead of showing a fake success message.

To activate real submissions:
1. Create a free form endpoint (e.g. Formspree, Getform) or a small backend.
2. Open `assets/script.js` and set `FORM_ENDPOINT` at the top to that URL.
3. Test by submitting the form — you should receive the enquiry by email.

Until this is done, the form directs parents to call **0904 013 9800**.

## Confirmed school details used on the site
- **Name:** Golden International School Academy
- **Address:** Polo Road, near Polo Health Clinic
- **Phone:** 0904 013 9800 (`tel:` links use +234 904 013 9800)
- No fees, deadlines, exam dates, accreditations or results have been
  invented anywhere on the site.

## Photography credits
Supporting stock photographs are from Unsplash (free to use under the
Unsplash Licence) and are placeholders for the school’s own photography.

## Helpful tips
- Press **Ctrl/Cmd + K** anywhere on the site to open search.
- Colours and fonts live at the top of `assets/style.css`
  (Navy `#102544`, Royal `#173F73`, Gold `#F2B705`).
- To change the phone number everywhere, search the HTML files for
  `0904 013 9800` and `+2349040139800`.
