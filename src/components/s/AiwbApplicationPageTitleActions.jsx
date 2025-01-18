import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import "../../styles/aiwb-ui/button.scss"
import "../../styles/aiwb-ui/dropdown-menu.sass"

export default function AiwbApplicationPageTitleActions(){
	return (<>
		<div className="flex flex-row items-center mt-3">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild>
					<button className="aiwb-button primary">立刻下载</button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content className="aiwb-dd-content">
					<DropdownMenu.Item className="aiwb-dd-item">使用 ghproxy 下载 v1.5.0.4</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</>)
}