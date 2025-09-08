export const siteConfig = {
  name: "BlogPlatform",
  description: "A modern, full-stack blogging platform built with Next.js, Supabase, and Prisma.",
  url: "https://yourdomain.com", // Update this with your actual domain
  ogImage: "https://yourdomain.com/og.jpg", // Update this with your actual OG image
  links: {
    twitter: "https://twitter.com/yourhandle",
    github: "https://github.com/yourusername/blogplatform",
  },
}

export const navConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Blog",
      href: "/blog",
    },
    {
      title: "About",
      href: "/about",
    },
  ],
  sidebarNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: "dashboard",
    },
    {
      title: "Posts",
      href: "/dashboard/posts",
      icon: "post",
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: "analytics",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
}

export const dashboardConfig = {
  mainNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "Posts",
      href: "/dashboard/posts",
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
    },
  ],
  sidebarNav: [
    {
      title: "Posts",
      href: "/dashboard/posts",
      icon: "post",
      items: [
        {
          title: "All Posts",
          href: "/dashboard/posts",
        },
        {
          title: "Create New",
          href: "/dashboard/posts/new",
        },
        {
          title: "Drafts",
          href: "/dashboard/posts/drafts",
        },
      ],
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: "analytics",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
      items: [
        {
          title: "General",
          href: "/dashboard/settings",
        },
        {
          title: "Profile",
          href: "/dashboard/settings/profile",
        },
      ],
    },
  ],
}
