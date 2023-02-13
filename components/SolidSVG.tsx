// styles
import styles from '../styles';
import stylescss from '../styles/page.module.css';

interface SolidSvgProps {
    width: string,
    height: string,
    path: string,
    color?: string,
    className?: string,
    fit?: boolean
  }

export default function SolidSvg({ width, height, path, color = "#FF8AC5", className = "", fit = false }: SolidSvgProps) {
	return <div className={className}>
		<style jsx>{`
			div {
				width: ${width};
				height: ${height};
				background-color: ${color};
				mask: url(${path});
				mask-repeat: no-repeat;
				mask-position: center;
				mask-size: ${fit ? "contain": "auto"};
			}
		`}</style>
	</div>
}