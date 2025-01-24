import React from 'react';
import {AppSidebar} from "@/Components/SidebarLayout/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import {Separator} from "@/Components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/Components/ui/sidebar";
import {PermissionContextProvider} from "@/Contexts/Global/PermissonContext";
import {AuthContextProvider} from "@/Contexts/AuthContext";
import {WeddingContextProvider} from "@/Contexts/Wedding/WeddingContext";

/*
    This layout is the defaultLayout for logged in users.
 */


function DashboardLayout({children, wedding}: { children: React.ReactNode, wedding: number }) {
    return (
        <AuthContextProvider>
            <WeddingContextProvider weddingId={wedding}>
                <PermissionContextProvider>
                    <SidebarProvider>
                        <AppSidebar/>
                        <SidebarInset className="w-full overflow-hidden">
                            <header
                                className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b border-slate-200">
                                <div className="flex items-center gap-2 px-4">
                                    <SidebarTrigger className="-ml-1"/>
                                    <Separator orientation="vertical" className="mr-2 h-4"/>
                                    <Breadcrumb>
                                        <BreadcrumbList>
                                            <BreadcrumbItem className="hidden md:block">
                                                <BreadcrumbLink href="#">
                                                    Building Your Application
                                                </BreadcrumbLink>
                                            </BreadcrumbItem>
                                            <BreadcrumbSeparator className="hidden md:block"/>
                                            <BreadcrumbItem>
                                                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                                            </BreadcrumbItem>
                                        </BreadcrumbList>
                                    </Breadcrumb>
                                </div>
                            </header>
                            <div className="flex-1 gap-4" style={{maxHeight: 'calc(100vh - 4rem)'}}>
                                {children}
                            </div>
                        </SidebarInset>
                    </SidebarProvider>
                </PermissionContextProvider>
            </WeddingContextProvider>
        </AuthContextProvider>
    );
}

export default DashboardLayout;