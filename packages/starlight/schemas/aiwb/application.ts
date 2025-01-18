import type {SchemaContext} from "astro:content";
import {z} from "astro/zod";
// @ts-ignore
import GithubLangs from "./github_lang_colors.json"

const githubLangsArr = Object.keys(GithubLangs);

const AiwbApplicationGitRepoSchema = (defaultTitle: string) => z.object({
    title: z.string().default(defaultTitle),
    gitRepo: z.string().or(z.object({
        provider: z.enum(["github", "gitlab", "gitea-official"]),
        org: z.string(),
        repo: z.string(),
    })),
    isArchived: z.boolean().default(false),
    isMainRepo: z.boolean().default(true),
})

const AiwbApplicationWebsiteSchema = () => z.object({
    title: z.string(),
    url: z.string(),
})

export const AiwbApplicationSchema = ({image}: SchemaContext) =>
    z.object({
        appName: z.string(),
        appShortName: z.string().optional(),
        appPackageName: z.string(),
        appIcon: image().optional(),
        appTagline: z.string().optional(),
        appDescription: z.string().optional(), // @ts-ignore
        progLanguages: z.array(z.enum(githubLangsArr)).optional(),
        developer: z.object({
            name: z.string(),
            personalWebsite: z.string().optional(),
            githubUserName: z.string().optional(),
            gitlabUserName: z.string().optional(),
            avatar: z.enum(["github", "gitlab"]).or(z.string()).optional(),
            email: z.string().optional()
        }),
        attributes: z.object({
            isOpenSource: z.boolean().default(true),
            pricingType: z.enum(["free","freemium","subscription","paid"]).default("free"),
            supportedPlatform: z.array(z.enum(["windows7","windows8","windows8.1","windows10","windows11","macos","uos","linux"])),
            tags: z.array(z.string()).optional()
        }),
        link: z.object({
            github: z.array(AiwbApplicationGitRepoSchema("GitHub 仓库")).optional(),
            gitlab: z.array(AiwbApplicationGitRepoSchema("GitLab 仓库")).optional(),
            gitea: z.array(AiwbApplicationGitRepoSchema("Gitea 仓库")).optional(),
            website: z.array(AiwbApplicationWebsiteSchema()).optional(),
        })
    });
