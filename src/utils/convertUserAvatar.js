export const convertUserAvatar = (developer) => {
	let type = developer.avatar === "github" ? 'github' :
		developer.avatar === "gitlab" ? 'gitlab': 'url';
	if (type === "github") {
		return `https://github.com/${developer.githubUserName??"ghost"}.png`;
	} else if (type === "gitlab") {
		return `https://gitlab.com/${developer.gitlabUserName??"dubi906w"}.png`;
	} else if (type === "url") {
		return developer.avatar
	}
}