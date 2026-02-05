/// <reference path="../pbjs.d.ts" />

migrate(async (db) => {
  // site_settings singleton
  const siteSettings = new Collection({
    id: 'site_settings',
    name: 'site_settings',
    type: 'base',
    system: false,
    schema: [
      { name: 'homeTitle', type: 'text', required: true },
      { name: 'homeIntro', type: 'editor', required: false },
      { name: 'homeHeroImage', type: 'file', required: false, options: { maxSelect: 1 } },
      { name: 'contactEmail', type: 'email', required: false },
      { name: 'contactPhone', type: 'text', required: false },
      { name: 'contactAddress', type: 'text', required: false },
      { name: 'contactNotes', type: 'editor', required: false }
    ],
    indexes: [],
    options: { onlySingleton: true }
  })

  await db.collections().create(siteSettings)

  // create default singleton record
  await db.collection('site_settings').create({
    homeTitle: 'Willkommen beim Fasnachtsverein Lostorf',
    homeIntro: 'Die Fasnacht ist aus dem kulturellen Leben unserer Gemeinde nicht mehr wegzudenken. Gemeinsam schaffen wir unvergessliche Momente.\n\nKommt vorbei, macht mit und geniesst!',
    contactEmail: 'info@fako-lostorf.ch',
    contactPhone: '',
    contactAddress: 'Fasnachtsverein Lostorf\n4654 Lostorf',
    contactNotes: ''
  })

  // news
  const news = new Collection({
    id: 'news',
    name: 'news',
    type: 'base',
    system: false,
    schema: [
      { name: 'title', type: 'text', required: true },
      { name: 'slug', type: 'text', required: false },
      { name: 'body', type: 'editor', required: false },
      { name: 'publishedAt', type: 'date', required: false },
      { name: 'heroImage', type: 'file', required: false, options: { maxSelect: 1 } },
      { name: 'isPinned', type: 'bool', required: false }
    ],
    indexes: [],
    options: {}
  })

  await db.collections().create(news)

  // events
  const events = new Collection({
    id: 'events',
    name: 'events',
    type: 'base',
    system: false,
    schema: [
      { name: 'title', type: 'text', required: true },
      { name: 'description', type: 'editor', required: false },
      { name: 'startDate', type: 'date', required: true },
      { name: 'endDate', type: 'date', required: false },
      { name: 'location', type: 'text', required: false },
      { name: 'category', type: 'select', required: false, options: { values: ['Umzug', 'Ball', 'Kinderfasnacht', 'Sonstiges'] } },
      { name: 'image', type: 'file', required: false, options: { maxSelect: 1 } },
      { name: 'isHighlight', type: 'bool', required: false }
    ],
    indexes: [],
    options: {}
  })

  await db.collections().create(events)

  // gallery_links
  const galleryLinks = new Collection({
    id: 'gallery_links',
    name: 'gallery_links',
    type: 'base',
    system: false,
    schema: [
      { name: 'title', type: 'text', required: true },
      { name: 'date', type: 'date', required: false },
      { name: 'coverImage', type: 'file', required: false, options: { maxSelect: 1 } },
      { name: 'externalUrl', type: 'url', required: true }
    ],
    indexes: [],
    options: {}
  })

  await db.collections().create(galleryLinks)
}, async (db) => {
  await db.collections().delete('gallery_links')
  await db.collections().delete('events')
  await db.collections().delete('news')
  await db.collections().delete('site_settings')
})
