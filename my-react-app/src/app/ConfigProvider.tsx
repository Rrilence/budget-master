import { ConfigProvider, theme} from "antd";
import { useSelector } from "react-redux";
import { selectTheme } from "../entities/Theme/theme-slice";

interface AntProps {
    children: React.ReactNode
}


const AntProvider = ({children}: AntProps) => {

    const isTheme = useSelector(selectTheme);

    return (

        <ConfigProvider
            theme = {{
                token: {
                    fontSize: 15,
                    colorPrimary: "#85a5ff",
                    colorInfo: "#85a5ff",
                    colorLink: "#f5f6f9",
                    colorLinkActive: "#1a1286"
                },
                components: {
                    Button: {
                    contentFontSize: 16,
                    paddingInline: 4,
                    defaultColor: "rgb(6,17,120)",
                    defaultBorderColor: "rgb(6,17,120)",
                    textTextColor: "rgb(238,240,251)",
                    textTextActiveColor: "rgb(37,19,195)",
                    textTextHoverColor: "rgb(238,240,251)",
                    colorBgTextActive: "rgba(255,255,255,0.62)"
                    },
                    Input: {
                    inputFontSize: 16
                    },
                    Layout: {
                    bodyBg: "rgba(162,170,207,0.1)"
                    }
                },
                algorithm: (isTheme === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm)
                }}

        >
            {children}
        </ConfigProvider>
    )

    }

export default AntProvider