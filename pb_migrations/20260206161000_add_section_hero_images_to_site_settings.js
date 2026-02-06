migrate((app) => {
  const col = app.findCollectionByNameOrId("site_settings")

  col.fields.push({
    type: "file",
    name: "contactHeroImage",
    required: false,
    presentable: true,
    maxSelect: 1,
  })

  col.fields.push({
    type: "file",
    name: "newsHeroImage",
    required: false,
    presentable: true,
    maxSelect: 1,
  })

  col.fields.push({
    type: "file",
    name: "eventsHeroImage",
    required: false,
    presentable: true,
    maxSelect: 1,
  })

  col.fields.push({
    type: "file",
    name: "galleryHeroImage",
    required: false,
    presentable: true,
    maxSelect: 1,
  })

  app.save(col)
}, (app) => {
  const col = app.findCollectionByNameOrId("site_settings")
  col.fields = (col.fields || []).filter((f) => !["contactHeroImage", "newsHeroImage", "eventsHeroImage", "galleryHeroImage"].includes(f.name))
  app.save(col)
})
