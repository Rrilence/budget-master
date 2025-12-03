import { createStyles } from "antd-style";

const useStyles = createStyles(() => ({
  root: {
    color: '#e0e0e0',
    borderRadius: 12,
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
  },
  title: {
    backgroundImage: 'linear-gradient(180deg, rgb(158, 201, 234), rgba(32, 86, 117, 1))',
    padding: '12px 16px',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    },
}));

export {useStyles}