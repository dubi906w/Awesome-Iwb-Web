import {defineCollection, z} from 'astro:content';
import {docsLoader} from '@astrojs/starlight/loaders';
import {docsSchema} from '@astrojs/starlight/schema';
import {Icons} from "./icons/Icons.ts"

type IconName = keyof typeof Icons;
const iconNames = Object.keys(Icons) as [IconName, ...IconName[]];

const BadgeConfigSchema = z.object({
	text: z.string(),
	variant: z
		.enum(['note', 'tip', 'caution', 'danger', 'success', 'default'])
		.optional(),
	class: z.string().optional(),
});

export const collections = {
    docs: defineCollection({
        loader: docsLoader(), schema: docsSchema({
            extend: ({image}) =>
                z.object({
                    // Make a built-in field required instead of optional.
                    hero: z.object({
						title: z.string().optional(),
						productName: z.string().optional(),
						tagline: z.string().optional(),
						image: z.union([
							z.object({
								file: image(),
								alt: z.string().optional(),
							}),
							z.object({
								dark: image(),
								light: image(),
								alt: z.string().optional(),
							}),
							z.object({
								html: z.string(),
							}),
						]),
						actions: z.array(z.object({
							text: z.string(),
							link: z.string(),
							variant: z.enum(['primary', 'secondary', 'minimal']).optional(),
							// 此处来自 starlight 自己的代码
							icon: z
								// @ts-ignore
								.union([z.enum(iconNames), z.string().startsWith('<svg')])
								.transform((icon) => {
									// @ts-ignore
									const parsedIcon = z.enum(iconNames).safeParse(icon);
									return parsedIcon.success
										? ({ type: 'icon', name: parsedIcon.data } as const)
										: ({ type: 'raw', html: icon } as const);
								})
								.optional(),
							attrs: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
						})).optional(),
					}).optional(),

					sidebar: z.object({
						label: z.string().optional(),
						order: z.number().optional(),
						hidden: z.boolean().optional(),
						badge: z.union([z.string(), BadgeConfigSchema]).optional(),
						attrs: z.object({
							aiwb_icon: z.string().optional(),
							aiwb_desc: z.string().optional(),
							html_attr: z.record(
									z.union([z.string(), z.number(), z.boolean(), z.undefined()])
								)
								.optional()
						})
					}).optional()
                }),
        })
    }),
};
