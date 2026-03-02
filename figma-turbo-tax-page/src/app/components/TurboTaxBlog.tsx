import { useState } from "react";
import { Search, ChevronDown, Facebook, Twitter, Instagram, Youtube, Menu, X, ChevronRight } from "lucide-react";

const categories = [
  "All",
  "Tax Tips",
  "Deductions & Credits",
  "Tax Reform",
  "Life",
  "Jobs & Career",
  "Tax News",
  "Investments & Rental Properties",
];

const featuredPost = {
  id: 0,
  category: "Tax Tips",
  title: "Everything You Need to Know About Filing Your Taxes This Year",
  excerpt:
    "From new tax brackets to updated deductions and credits, here's your complete guide to navigating this tax season with confidence — and getting every dollar you deserve.",
  image: "https://images.unsplash.com/photo-1762427354566-2b6902a9fd06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXglMjBmaWxpbmclMjBkb2N1bWVudHMlMjBkZXNrJTIwY2FsY3VsYXRvcnxlbnwxfHx8fDE3NzIyMzQ5NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  author: "TurboTax Team",
  date: "February 20, 2026",
  readTime: "8 min read",
};

const posts = [
  {
    id: 1,
    category: "Deductions & Credits",
    title: "Top 10 Tax Deductions You Might Be Missing",
    excerpt:
      "Many taxpayers leave money on the table every year. Here are the most commonly overlooked deductions that could reduce your tax bill.",
    image: "https://images.unsplash.com/photo-1758612215020-842383aadb9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwb2ZmaWNlJTIwZGVkdWN0aW9uJTIwcmVtb3RlJTIwd29ya3xlbnwxfHx8fDE3NzIyMzQ5Njh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    author: "Lisa Greene-Lewis",
    date: "February 18, 2026",
    readTime: "6 min read",
  },
  {
    id: 2,
    category: "Investments & Rental Properties",
    title: "How to Report Investment Income on Your Tax Return",
    excerpt:
      "Dividends, capital gains, and crypto — understanding how each type of investment income is taxed can save you from surprises come tax time.",
    image: "https://images.unsplash.com/photo-1694162789200-3b018f615efe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnZlc3RtZW50JTIwc3RvY2slMjBtYXJrZXQlMjBtb25leXxlbnwxfHx8fDE3NzIyMzQ5Njd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    author: "TurboTax Team",
    date: "February 15, 2026",
    readTime: "7 min read",
  },
  {
    id: 3,
    category: "Jobs & Career",
    title: "Self-Employed? Here's What You Need to Know About Taxes",
    excerpt:
      "Freelancers and independent contractors have unique tax obligations. Learn about quarterly payments, deductions, and how to keep your records straight.",
    image: "https://images.unsplash.com/photo-1636734854861-8dee9e5d459a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVlbGFuY2VyJTIwZ2lnJTIwZWNvbm9teSUyMHNlbGYlMjBlbXBsb3llZHxlbnwxfHx8fDE3NzIyMzQ5NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    author: "Katharina Reekmans",
    date: "February 12, 2026",
    readTime: "9 min read",
  },
  {
    id: 4,
    category: "Life",
    title: "How Major Life Events Affect Your Taxes",
    excerpt:
      "Getting married, having a baby, buying a home — life's big moments come with big tax implications. Find out what changes and how to prepare.",
    image: "https://images.unsplash.com/photo-1758691031749-607d43c14f63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBob21lJTIwZmluYW5jZXMlMjBidWRnZXRpbmd8ZW58MXx8fHwxNzcyMjM0OTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    author: "TurboTax Team",
    date: "February 10, 2026",
    readTime: "5 min read",
  },
  {
    id: 5,
    category: "Tax Tips",
    title: "5 Ways to Maximize Your Tax Refund This Year",
    excerpt:
      "Your refund is money you've already earned. Here are five proven strategies to make sure you're getting everything back that you're owed.",
    image: "https://images.unsplash.com/photo-1598432439250-0330f9130e14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXglMjByZWZ1bmQlMjBtb25leSUyMHNhdmluZ3N8ZW58MXx8fHwxNzcyMTYzMTE2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    author: "Lisa Greene-Lewis",
    date: "February 8, 2026",
    readTime: "5 min read",
  },
  {
    id: 6,
    category: "Life",
    title: "Education Tax Credits and Deductions for Students and Parents",
    excerpt:
      "From the American Opportunity Credit to student loan interest deductions, there are several tax breaks available for education expenses.",
    image: "https://images.unsplash.com/photo-1653945475227-596b295cff01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudCUyMGVkdWNhdGlvbiUyMGZpbmFuY2lhbCUyMGFpZHxlbnwxfHx8fDE3NzIyMzQ5NzF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    author: "TurboTax Team",
    date: "February 5, 2026",
    readTime: "6 min read",
  },
  {
    id: 7,
    category: "Jobs & Career",
    title: "Work From Home? Your Home Office Deduction Explained",
    excerpt:
      "If you use part of your home exclusively for work, you may be eligible for the home office deduction. Here's how to qualify and calculate it.",
    image: "https://images.unsplash.com/photo-1633605435219-654abe70d37e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjB3b3JraW5nJTIwbGFwdG9wJTIwdGF4ZXN8ZW58MXx8fHwxNzcyMjM0OTY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    author: "Katharina Reekmans",
    date: "February 3, 2026",
    readTime: "7 min read",
  },
  {
    id: 8,
    category: "Investments & Rental Properties",
    title: "Retirement Accounts and Your Taxes: IRA, 401(k), and More",
    excerpt:
      "Contributing to retirement accounts can lower your taxable income now or provide tax-free growth later. Learn the tax advantages of each account type.",
    image: "https://images.unsplash.com/photo-1758686254493-d73c9c2a3049?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRpcmVtZW50JTIwcGxhbm5pbmclMjBzZW5pb3IlMjBjb3VwbGV8ZW58MXx8fHwxNzcyMjM0OTcyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    author: "TurboTax Team",
    date: "January 30, 2026",
    readTime: "8 min read",
  },
  {
    id: 9,
    category: "Tax News",
    title: "IRS Updates for 2026: New Rules and What They Mean for You",
    excerpt:
      "The IRS has announced several key changes for the upcoming tax year. Here's what's new and how these updates could affect your filing.",
    image: "https://images.unsplash.com/photo-1628871733831-1175aa487713?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFsbCUyMGJ1c2luZXNzJTIwb3duZXIlMjBlbnRyZXByZW5ldXJ8ZW58MXx8fHwxNzcyMTc2MDU3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    author: "TurboTax Team",
    date: "January 28, 2026",
    readTime: "5 min read",
  },
];

export default function TurboTaxBlog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Top utility bar — Intuit dark navy */}
      <div className="bg-[#1a1a3e] text-white text-center py-2 px-4 text-sm">
        File taxes confidently. Get your biggest refund, guaranteed.{" "}
        <a href="#" className="underline font-semibold ml-1 hover:text-blue-200">
          Start for Free &rsaquo;
        </a>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2 shrink-0">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="18" fill="#0b8b24" />
                <path d="M18 8 L22 14 L18 12 L14 14 Z" fill="white" opacity="0.9" />
                <path d="M28 18 L22 22 L24 18 L22 14 Z" fill="white" opacity="0.7" />
                <path d="M18 28 L14 22 L18 24 L22 22 Z" fill="white" opacity="0.9" />
                <path d="M8 18 L14 14 L12 18 L14 22 Z" fill="white" opacity="0.7" />
                <circle cx="18" cy="18" r="4" fill="white" />
              </svg>
              <span className="text-[#0b8b24] font-black text-2xl tracking-tight">TurboTax</span>
              <span className="text-gray-300 mx-2 hidden sm:block">|</span>
              <span className="text-gray-500 text-sm hidden sm:block">Tax Tips &amp; Videos</span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {categories.slice(1).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-2 text-sm transition-colors whitespace-nowrap border-b-2 ${
                    activeCategory === cat
                      ? "border-[#0b8b24] text-[#0b8b24] font-semibold"
                      : "border-transparent text-gray-700 hover:text-[#0b8b24]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </nav>

            {/* Right icons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-gray-500 hover:text-[#0b8b24] transition-colors p-1"
              >
                <Search size={20} />
              </button>
              <a
                href="#"
                className="hidden sm:inline-flex items-center gap-1 bg-[#0b8b24] hover:bg-[#097a1f] text-white text-sm font-semibold px-5 py-2 rounded transition-colors"
              >
                File Now
              </a>
              <button
                className="lg:hidden text-gray-500 hover:text-[#0b8b24] p-1"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <div className="pb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search tax tips, articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#0b8b24] focus:border-transparent"
                  autoFocus
                />
              </div>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-3">
            <div className="flex flex-col gap-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-3 py-2 text-sm transition-colors ${
                    activeCategory === cat
                      ? "text-[#0b8b24] font-semibold"
                      : "text-gray-700 hover:text-[#0b8b24]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Category pill nav */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 py-1.5 rounded text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-[#e8f5e9] text-[#0b8b24] font-semibold"
                    : "text-gray-600 hover:text-[#0b8b24] hover:bg-gray-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Article */}
        {activeCategory === "All" && (
          <div className="mb-10">
            <div className="grid lg:grid-cols-2 gap-0 overflow-hidden rounded-lg shadow-md group cursor-pointer">
              <div className="relative overflow-hidden">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-72 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  style={{ minHeight: 320 }}
                />
              </div>
              <div className="bg-[#f4faf4] p-8 lg:p-10 flex flex-col justify-center">
                <span className="inline-flex w-fit text-xs font-semibold text-[#0b8b24] uppercase tracking-wide mb-3">
                  {featuredPost.category}
                </span>
                <h1 className="text-[#1a1a1a] mb-4 leading-tight group-hover:text-[#0b8b24] transition-colors" style={{ fontSize: "1.6rem", fontWeight: 700 }}>
                  {featuredPost.title}
                </h1>
                <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{featuredPost.author}</p>
                    <p className="text-xs text-gray-500">{featuredPost.date} · {featuredPost.readTime}</p>
                  </div>
                  <a href="#" className="flex items-center gap-1 text-[#0b8b24] font-semibold text-sm hover:underline">
                    Read More <ChevronRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section title */}
        <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-3">
          <h2 className="text-[#1a1a1a]" style={{ fontSize: "1.2rem", fontWeight: 700 }}>
            {activeCategory === "All" ? "Latest Articles" : activeCategory}
          </h2>
          <span className="text-sm text-gray-400">{filteredPosts.length} articles</span>
        </div>

        {/* Post Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white overflow-hidden hover:shadow-md transition-shadow duration-200 group cursor-pointer flex flex-col border border-gray-100 rounded-lg"
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <span className="inline-flex w-fit text-xs font-semibold text-[#0b8b24] uppercase tracking-wide mb-2">
                  {post.category}
                </span>
                <h3
                  className="text-[#1a1a1a] mb-2 leading-snug group-hover:text-[#0b8b24] transition-colors flex-1"
                  style={{ fontSize: "1rem", fontWeight: 700 }}
                >
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                  <div>
                    <p className="text-xs font-semibold text-gray-700">{post.author}</p>
                    <p className="text-xs text-gray-400">{post.date}</p>
                  </div>
                  <span className="text-xs text-gray-400">{post.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mb-12">
          <button className="inline-flex items-center gap-2 border border-[#0b8b24] text-[#0b8b24] hover:bg-[#0b8b24] hover:text-white font-semibold px-8 py-2.5 rounded transition-colors text-sm">
            Load More Articles <ChevronDown size={16} />
          </button>
        </div>

        {/* Newsletter CTA */}
        <div className="bg-[#f4faf4] border border-[#c8e6c9] rounded-lg p-8 md:p-12 text-center mb-12">
          <h2 className="text-[#1a1a1a] mb-3" style={{ fontSize: "1.4rem", fontWeight: 700 }}>
            Get Tax Tips Delivered to Your Inbox
          </h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto text-sm leading-relaxed">
            Join millions of Americans who trust TurboTax for smart tax advice.
            Subscribe for the latest articles, guides, and filing reminders.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-2.5 rounded border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b8b24]"
            />
            <button className="bg-[#0b8b24] text-white font-semibold px-6 py-2.5 rounded hover:bg-[#097a1f] transition-colors text-sm shrink-0">
              Subscribe
            </button>
          </div>
          <p className="text-gray-400 text-xs mt-3">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1a1a3e] text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <svg width="28" height="28" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="18" cy="18" r="18" fill="#0b8b24" />
                  <path d="M18 8 L22 14 L18 12 L14 14 Z" fill="white" opacity="0.9" />
                  <path d="M28 18 L22 22 L24 18 L22 14 Z" fill="white" opacity="0.7" />
                  <path d="M18 28 L14 22 L18 24 L22 22 Z" fill="white" opacity="0.9" />
                  <path d="M8 18 L14 14 L12 18 L14 22 Z" fill="white" opacity="0.7" />
                  <circle cx="18" cy="18" r="4" fill="white" />
                </svg>
                <span className="text-white font-black text-xl">TurboTax</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                America's #1 tax preparation software. File your taxes with confidence.
              </p>
              <div className="flex gap-3">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0b8b24] transition-colors">
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>

            {/* Tax Tips */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Tax Tips</h4>
              <ul className="space-y-2 text-sm">
                {["Tax Basics", "Filing Your Return", "After You File", "Tax Refunds", "Tax Extensions"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tax Deductions */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Deductions</h4>
              <ul className="space-y-2 text-sm">
                {["Standard Deduction", "Itemized Deductions", "Business Expenses", "Charitable Giving", "Medical Expenses"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* About */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-4">About</h4>
              <ul className="space-y-2 text-sm">
                {["About TurboTax", "TurboTax Blog", "Press", "Careers", "Contact Us"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">An</span>
                <span className="text-white font-bold text-sm italic">intuit</span>
                <span className="text-xs text-gray-500">product</span>
              </div>
              <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                <a href="#" className="hover:text-gray-300">Privacy Policy</a>
                <a href="#" className="hover:text-gray-300">Terms of Use</a>
                <a href="#" className="hover:text-gray-300">Security</a>
                <a href="#" className="hover:text-gray-300">Do Not Sell My Info</a>
              </div>
              <p className="text-xs text-gray-500">
                © {new Date().getFullYear()} Intuit Inc. All rights reserved.
              </p>
            </div>
            <p className="text-xs text-gray-600 mt-4 leading-relaxed">
              TurboTax® is a registered trademark of Intuit, Inc. This blog is for informational purposes only.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}