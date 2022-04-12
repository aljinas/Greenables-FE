export default [
  { icon: "mdi-contacts", text: "Branches", link: "branch" },
  { icon: "mdi-history", text: "Financial Year", link: "financial_year" },
  { icon: "mdi-content-copy", text: "Employee", link: "employee" },
  {
    icon: "mdi-chevron-up",
    "icon-alt": "mdi-chevron-down",
    text: "Sales",
    model: false,
    children: [{ icon: "mdi-plus", text: "Sale Entry", link: "sale_entry" }],
  },
  {
    icon: "mdi-chevron-up",
    "icon-alt": "mdi-chevron-down",
    text: "Products",
    model: false,
    children: [
      { text: "Product", link: "product" },
      { text: "Pricing", link: "pricing" },
    ],
  },
  { icon: "mdi-cog", text: "Settings", link: "#" },
  { icon: "mdi-message", text: "Send feedback", link: "#" },
  { icon: "mdi-help-circle", text: "Help", link: "#" },
  { icon: "mdi-cellphone-link", text: "App downloads", link: "#" },
  { icon: "mdi-keyboard", text: "Go to the old version", link: "#" },
]
