import * as React from "react"
import {
    AudioWaveform,
    BookOpen,
    Gem,
    Users,
    Command,
    GalleryVerticalEnd, GemIcon,
    HandCoins,
    Mail,
    Settings2,
} from "lucide-react"

import { NavMain } from "@/Components/SidebarLayout/nav-main"
import { NavProjects } from "@/Components/SidebarLayout/nav-projects"
import { NavUser } from "@/Components/SidebarLayout/nav-user"
import { TeamSwitcher } from "@/Components/SidebarLayout/team-switcher"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/Components/ui/sidebar"
import {usePage} from "@inertiajs/react";

// This is sample data.
const data = {
    teams: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "My Wedding",
            url: "#",
            icon: Gem,
            isActive: true,
            items: [
                {
                    title: "Tasks",
                    url: "/1/task-list",
                },
                {
                    title: "Agenda",
                    url: "#",
                },
                {
                    title: "Planboard",
                    url: "#",
                },
                {
                    title: "Access Control",
                    url: "#",
                },
                {
                    title: "Settings",
                    url: "#",
                },
            ],
        },
        {
            title: "Guests",
            url: "#",
            icon: Users,
            items: [
                {
                    title: "RSVP",
                    url: "#",
                },
                {
                    title: "Guestlist",
                    url: "#",
                },
                {
                    title: "Invitations",
                    url: "#",
                },
            ],
        },
        {
            title: "Budgeting",
            url: "#",
            icon: HandCoins,
            items: [
                {
                    title: "Budget setup",
                    url: "#",
                },
                {
                    title: "Get Started",
                    url: "#",
                },
                {
                    title: "Tutorials",
                    url: "#",
                },
                {
                    title: "Changelog",
                    url: "#",
                },
            ],
        },
        {
            title: "Communication",
            url: "#",
            icon: Mail,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const {auth} = usePage().props

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={auth.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
