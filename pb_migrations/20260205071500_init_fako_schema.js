migrate((app) => {
  // site_settings singleton
  try {
    const existing = app.findCollectionByNameOrId("site_settings")
    app.delete(existing)
  } catch {}

  const siteSettings = new Collection({
    type: "base",
    name: "site_settings",
    system: false,
    options: { onlySingleton: true },
    fields: [
      { type: "text", name: "homeTitle", required: true, presentable: true, max: 200 },
      { type: "editor", name: "homeIntro", required: false, presentable: true },
      {
        type: "file",
        name: "homeHeroImage",
        required: false,
        presentable: true,
        maxSelect: 1,
        maxSize: 10 * 1024 * 1024,
        mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
        thumbs: ["1200x600", "800x400"],
      },
      { type: "email", name: "contactEmail", required: false, presentable: true },
      { type: "text", name: "contactPhone", required: false, presentable: true, max: 40 },
      { type: "text", name: "contactAddress", required: false, presentable: true, max: 300 },
      { type: "editor", name: "contactNotes", required: false, presentable: true },
    ],
  })

  app.save(siteSettings)

  // default singleton record
  const settingsCol = app.findCollectionByNameOrId("site_settings")
  const settingsRec = new Record(settingsCol)
  settingsRec.set("homeTitle", "Willkommen beim Fasnachtsverein Lostorf")
  settingsRec.set(
    "homeIntro",
    "Die Fasnacht ist aus dem kulturellen Leben unserer Gemeinde nicht mehr wegzudenken. Gemeinsam schaffen wir unvergessliche Momente.\n\nKommt vorbei, macht mit und geniesst!",
  )
  settingsRec.set("contactEmail", "info@fako-lostorf.ch")
  settingsRec.set("contactPhone", "")
  settingsRec.set("contactAddress", "Fasnachtsverein Lostorf\n4654 Lostorf")
  settingsRec.set("contactNotes", "")
  app.save(settingsRec)

  // news
  try {
    const existingNews = app.findCollectionByNameOrId("news")
    app.delete(existingNews)
  } catch {}

  const news = new Collection({
    type: "base",
    name: "news",
    system: false,
    fields: [
      { type: "text", name: "title", required: true, presentable: true, max: 200 },
      { type: "text", name: "slug", required: false, presentable: true, max: 200 },
      { type: "editor", name: "body", required: false, presentable: true },
      { type: "date", name: "publishedAt", required: false, presentable: true },
      {
        type: "file",
        name: "heroImage",
        required: false,
        presentable: true,
        maxSelect: 1,
        maxSize: 10 * 1024 * 1024,
        mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
        thumbs: ["1200x600", "800x400"],
      },
      { type: "bool", name: "isPinned", required: false, presentable: true },
    ],
  })

  app.save(news)

  // events
  try {
    const existingEvents = app.findCollectionByNameOrId("events")
    app.delete(existingEvents)
  } catch {}

  const events = new Collection({
    type: "base",
    name: "events",
    system: false,
    fields: [
      { type: "text", name: "title", required: true, presentable: true, max: 200 },
      { type: "editor", name: "description", required: false, presentable: true },
      { type: "date", name: "startDate", required: true, presentable: true },
      { type: "date", name: "endDate", required: false, presentable: true },
      { type: "text", name: "location", required: false, presentable: true, max: 200 },
      {
        type: "select",
        name: "category",
        required: false,
        presentable: true,
        options: { values: ["Umzug", "Ball", "Kinderfasnacht", "Sonstiges"] },
      },
      {
        type: "file",
        name: "image",
        required: false,
        presentable: true,
        maxSelect: 1,
        maxSize: 10 * 1024 * 1024,
        mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
        thumbs: ["800x600", "400x300"],
      },
      { type: "bool", name: "isHighlight", required: false, presentable: true },
    ],
  })

  app.save(events)

  // gallery_links
  try {
    const existingGallery = app.findCollectionByNameOrId("gallery_links")
    app.delete(existingGallery)
  } catch {}

  const galleryLinks = new Collection({
    type: "base",
    name: "gallery_links",
    system: false,
    fields: [
      { type: "text", name: "title", required: true, presentable: true, max: 200 },
      { type: "date", name: "date", required: false, presentable: true },
      {
        type: "file",
        name: "coverImage",
        required: false,
        presentable: true,
        maxSelect: 1,
        maxSize: 10 * 1024 * 1024,
        mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
        thumbs: ["800x600", "400x300"],
      },
      { type: "url", name: "externalUrl", required: true, presentable: true, max: 500 },
    ],
  })

  app.save(galleryLinks)
}, (app) => {
  try { app.delete(app.findCollectionByNameOrId("gallery_links")) } catch {}
  try { app.delete(app.findCollectionByNameOrId("events")) } catch {}
  try { app.delete(app.findCollectionByNameOrId("news")) } catch {}
  try { app.delete(app.findCollectionByNameOrId("site_settings")) } catch {}
})
