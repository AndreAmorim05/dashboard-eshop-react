import {
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
} from '@mui/icons-material'


export const navigations = [
  {
    text: "Dashboard",
    path: "dashboard/default",
    icon: <HomeOutlined />,
  },
  {
    text: "Client Facing",
    path: "",
    icon: null,
  },
  {
    text: "Products",
    path: "dashboard/products",
    icon: <ShoppingCartOutlined />,
  },
  {
    text: "Customers",
    path: "",
    icon: <Groups2Outlined />,
  },
  {
    text: "Transactions",
    path: "",
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "Geography",
    path: "",
    icon: <PublicOutlined />,
  },
  {
    text: "Sales",
    path: "",
    icon: null,
  },
  {
    text: "Overview",
    path: "",
    icon: <PointOfSaleOutlined />,
  },
  {
    text: "Daily",
    path: "",
    icon: <TodayOutlined />,
  },
  {
    text: "Monthly",
    path: "",
    icon: <CalendarMonthOutlined />,
  },
  {
    text: "Breakdown",
    path: "",
    icon: <PieChartOutlined />,
  },
  {
    text: "Management",
    path: "",
    icon: null,
  },
  {
    text: "Admin",
    path: "",
    icon: <AdminPanelSettingsOutlined />,
  },
  {
    text: "Performance",
    path: "",
    icon: <TrendingUpOutlined />,
  },
];