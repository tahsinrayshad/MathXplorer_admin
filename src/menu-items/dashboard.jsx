// assets
import { DashboardOutlined } from '@ant-design/icons';
import PersonIcon from '@mui/icons-material/Person';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AnnouncementIcon from '@mui/icons-material/Announcement';


// icons
const icons = {
  DashboardOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'users',
      title: 'User',
      type: 'item',
      url: '/users',
      icon: PersonIcon,
      breadcrumbs: false
    },
    {
      id: 'problems',
      title: 'Problem',
      type: 'item',
      url: '/problems',
      icon: QuestionAnswerIcon,
      breadcrumbs: false
    },
    {
      id: 'contests',
      title: 'Contest',
      type: 'item',
      url: '/contests',
      icon: EmojiEventsIcon,
      breadcrumbs: false
    },
    {
      id: 'announcements',
      title: 'Announcement',
      type: 'item',
      url: '/announcements',
      icon: AnnouncementIcon,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
