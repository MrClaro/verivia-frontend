import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { classNames } from "@/lib/utils";
import type { NavMainItem } from "@/types";

export function NavMain({
  items,
}: {
  items: NavMainItem[];
}) {
  const navigate = useNavigate();
  const currentPath = window.location.pathname.replace("/", "") || "dashboard";
  const activePage = currentPath as string;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Sistema</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const Icon = item.icon;
          const isChildActive =
            item.items?.some((subItem) => subItem.page === activePage) ?? false;
          const isActive = item.page === activePage || isChildActive;

          if (!item.items?.length && item.page) {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={isActive}
                  onClick={() => item.page && navigate(`/${item.page}`)}
                  className={classNames(
                    "transition-all duration-150",
                    isActive &&
                      "border-l-2 border-primary bg-primary/10 text-primary font-semibold rounded-l-none",
                  )}
                >
                  {Icon && (
                    <Icon
                      className={classNames(
                        "h-4 w-4",
                        isActive ? "text-primary" : "text-muted-foreground",
                      )}
                    />
                  )}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isChildActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={classNames(
                      "transition-all duration-150",
                      isActive &&
                        "border-l-2 border-primary bg-primary/10 text-primary font-semibold rounded-l-none",
                    )}
                  >
                    {Icon && (
                      <Icon
                        className={classNames(
                          "h-4 w-4",
                          isActive ? "text-primary" : "text-muted-foreground",
                        )}
                      />
                    )}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => {
                      const SubIcon = subItem.icon;
                      const isSubActive = subItem.page === activePage;
                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild={false}
                            isActive={isSubActive}
                            onClick={() => navigate(`/${subItem.page}`)}
                            className={classNames(
                              "cursor-pointer transition-all duration-150",
                              isSubActive
                                ? "bg-primary/10 text-primary font-semibold data-[active=true]:bg-primary/10 data-[active=true]:text-primary"
                                : "text-muted-foreground hover:text-foreground",
                            )}
                          >
                            {SubIcon && (
                              <SubIcon
                                className={classNames(
                                  "size-4 shrink-0",
                                  isSubActive
                                    ? "text-primary"
                                    : "text-muted-foreground",
                                )}
                              />
                            )}
                            <span>{subItem.title}</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
