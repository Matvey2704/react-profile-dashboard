import { useMemo, useState } from 'react'
import './App.css'

type ListingStatus = 'active' | 'archive'

type Listing = {
  id: number
  title: string
  city: string
  price: string
  date: string
  views: number
  status: ListingStatus
}

const listings: Listing[] = [
  {
    id: 1,
    title: 'Toyota Camry, 2020',
    city: 'Moscow',
    price: '2 450 000 ₽',
    date: 'Today',
    views: 86,
    status: 'active',
  },
  {
    id: 2,
    title: 'Kia Rio, 2021',
    city: 'Kazan',
    price: '1 250 000 ₽',
    date: 'Yesterday',
    views: 54,
    status: 'active',
  },
  {
    id: 3,
    title: 'BMW 3 Series, 2019',
    city: 'Saint Petersburg',
    price: '2 900 000 ₽',
    date: '12 Jan',
    views: 108,
    status: 'archive',
  },
]

const partners = ['Drive', 'Rent', 'Pay', 'Jobs', 'Parts', 'Service']

function App() {
  const [activeTab, setActiveTab] = useState<ListingStatus>('active')
  const [search, setSearch] = useState('')

  const activeCount = listings.filter((item) => item.status === 'active').length
  const archiveCount = listings.filter((item) => item.status === 'archive').length
  const totalViews = listings.reduce((sum, item) => sum + item.views, 0)

  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      const matchesTab = listing.status === activeTab
      const matchesSearch = listing.title
        .toLowerCase()
        .includes(search.toLowerCase())

      return matchesTab && matchesSearch
    })
  }, [activeTab, search])

  return (
    <main className="profilePage">
      <header className="topbar">
        <strong>Profile Dashboard</strong>

        <div className="topbarActions">
          <input placeholder="Global search" />
          <button>Create listing</button>
        </div>
      </header>

      <aside className="sidebar">
        <div className="profileCard">
          <div className="avatar">M</div>

          <div>
            <h2>matvey.dev</h2>
            <p>On platform since 2024</p>
          </div>

          <div className="rating">
            <strong>4.6</strong>
            <span>★★★★★</span>
            <small>12 reviews</small>
          </div>
        </div>

        <div className="walletCard">
          <div>
            <span>Balance</span>
            <strong>0 ₽</strong>
          </div>
          <button>Top up</button>
        </div>

        <nav className="sideMenu">
          <a className="active">My listings</a>
          <a>Favorites</a>
          <a>Settings</a>
          <a>Logout</a>
        </nav>
      </aside>

      <section className="content">
        <div className="contentHeader">
          <div>
            <h1>My listings</h1>
            <p>Manage active and archived listings from your profile.</p>
          </div>
        </div>

        <div className="stats">
          <div>
            <span>Active</span>
            <strong>{activeCount}</strong>
          </div>
          <div>
            <span>Archive</span>
            <strong>{archiveCount}</strong>
          </div>
          <div>
            <span>Total views</span>
            <strong>{totalViews}</strong>
          </div>
        </div>

        <div className="tabs">
          <button
            className={activeTab === 'active' ? 'active' : ''}
            onClick={() => setActiveTab('active')}
          >
            Active
          </button>

          <button
            className={activeTab === 'archive' ? 'active' : ''}
            onClick={() => setActiveTab('archive')}
          >
            Archive
          </button>
        </div>

        <div className="searchBox">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search in listings"
          />
        </div>

        <div className="listings">
          {filteredListings.length > 0 ? (
            filteredListings.map((listing) => (
              <article className="listingCard" key={listing.id}>
                <div>
                  <div className="listingTop">
                    <h3>{listing.title}</h3>
                    <span>{listing.status}</span>
                  </div>

                  <p>
                    {listing.city} · {listing.date} · {listing.views} views
                  </p>
                </div>

                <div className="listingActions">
                  <strong>{listing.price}</strong>
                  <button>Edit</button>
                </div>
              </article>
            ))
          ) : (
            <div className="emptyState">
              <h3>No listings found</h3>
              <p>
                This state is shown when there are no listings in the selected
                tab or search results.
              </p>
            </div>
          )}
        </div>
      </section>

      <aside className="partnersPanel">
        <h3>Trusted partners</h3>

        <div className="partnersGrid">
          {partners.map((partner) => (
            <div className="partnerItem" key={partner}>
              <div>{partner[0]}</div>
              <span>{partner}</span>
            </div>
          ))}
        </div>
      </aside>
    </main>
  )
}

export default App