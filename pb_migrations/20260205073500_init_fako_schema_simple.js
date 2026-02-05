migrate((app) => {
  // site_settings singleton (basic version, letting PocketBase handle ids & internals)
  try {
    const existingSettings = app.findCollectionByNameOrId("site_settings")
    app.delete(existingSettings)
  } catch {}

  const siteSettings = new Collection({
    type: "base",
    name: "site_settings",
    system: false,
    options: { onlySingleton: true },
    fields: [
      { type: "text", name: "homeTitle", required: true, presentable: true, max: 200 },
      { type: "editor", name: "homeIntro", required: false, presentable: true },
      { type: "file", name: "homeHeroImage", required: false, presentable: true, maxSelect: 1 },
      { type: "email", name: "contactEmail", required: false, presentable: true },
      { type: "text", name: "contactPhone", required: false, presentable: true, max: 40 },
      { type: "text", name: "contactAddress", required: false, presentable: true, max: 300 },
      { type: "editor", name: "contactNotes", required: false, presentable: true },
    ],
  })

  app.save(siteSettings)

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

  // news (minimal options: keine Thumbs, keine speziellen MIME-Limits – das können wir später ergänzen)
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
      { type: "file", name: "heroImage", required: false, presentable: true, maxSelect: 1 },
      { type: "bool", name: "isPinned", required: false, presentable: true },
    ],
  })

  app.save(news)

  // events – "category" vorerst als einfacher Text, um Options-Validierungen zu umgehen
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
      { type: "text", name: "category", required: false, presentable: true, max: 100 },
      { type: "file", name: "image", required: false, presentable: true, maxSelect: 1 },
      { type: "bool", name: "isHighlight", required: false, presentable: true },
    ],
  })

  app.save(events)

  // gallery_links – einfache Version, ein Cover-Bild + externer Link
  try {
    const existingGalleryLinks = app.findCollectionByNameOrId("gallery_links")
    app.delete(existingGalleryLinks)
  } catch {}

  const galleryLinks = new Collection({
    type: "base",
    name: "gallery_links",
    system: false,
    fields: [
      { type: "text", name: "title", required: true, presentable: true, max: 200 },
      { type: "date", name: "date", required: false, presentable: true },
      { type: "file", name: "coverImage", required: false, presentable: true, maxSelect: 1 },
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
