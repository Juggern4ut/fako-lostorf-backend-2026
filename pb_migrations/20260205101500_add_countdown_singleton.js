migrate((app) => {
  // countdown_settings singleton
  const countdown = new Collection({
    type: "base",
    name: "countdown_settings",
    system: false,
    options: { onlySingleton: true },
    fields: [
      { type: "text", name: "label", required: true, presentable: true, max: 200 },
      { type: "date", name: "targetAt", required: true, presentable: true },
    ],
  })

  app.save(countdown)

  const col = app.findCollectionByNameOrId("countdown_settings")
  const rec = new Record(col)
  rec.set("label", "Fasnacht 2026")
  rec.set("targetAt", new Date().toISOString())
  app.save(rec)
}, (app) => {
  try { app.delete(app.findCollectionByNameOrId("countdown_settings")) } catch {}
})
