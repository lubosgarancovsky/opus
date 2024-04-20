"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { useNavigation } from "./useNavigation.hook";
import { Project, Story } from "@/utils/api";
import { Badge } from "@/components/ui/badge";
import { Bookmark, LucideBug } from "lucide-react";
import { cn } from "@/lib/utils";
import { StoryType } from "@/components/story";

const StoryListItem = ({ item }: { item: Story }) => {
  const label = (status: string) => {
    switch (status) {
      case "to-do":
        return "To do";
      case "in-progress":
        return "In progress";
    }
  };

  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          href={`/browse/${item.code}`}
          className="select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground flex gap-2 items-center"
        >
          <StoryType type={item.type} />
          <div className="space-y-1">
            <p className="text-sm leading-none font-bold">{item.code}</p>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {item.title}
            </p>
          </div>
          <div className="ml-auto">
            <Badge variant="outline">{label(item.status)}</Badge>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
};

const ProjectListItem = ({ item }: { item: Project }) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          href={`/projects/${item.id}`}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          <p className="text-sm leading-none font-bold">{item.title}</p>
          <p className="text-muted-foreground">{item.description}</p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};

export const HeaderNavigation = () => {
  const { stories, projects } = useNavigation();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>My work</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="p-4 w-[24rem] max-h-[24rem] overflow-y-auto">
              {stories.length ? (
                stories.map((item) => (
                  <StoryListItem key={item.id} item={item} />
                ))
              ) : (
                <li>
                  <div className="w-full p-4 border-dashed border-2 rounded-md text-center">
                    <b className="text-muted-foreground">
                      You are currently not assigned to any task
                    </b>
                  </div>
                </li>
              )}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <NavigationMenuLink asChild>
              <Link href="/projects">Projects</Link>
            </NavigationMenuLink>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="p-4 w-[24rem]">
              {projects.items.map((item) => (
                <ProjectListItem key={item.id} item={item} />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/explore">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Explore
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
