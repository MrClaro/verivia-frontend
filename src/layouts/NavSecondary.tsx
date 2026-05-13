import { useNavigate } from "react-router-dom";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { classNames } from "@/lib/utils";
import type { NavSecondaryItem } from "@/types";

export function NavSecondary({
  items,
}: {
  items: NavSecondaryItem[];
}) {
  const navigate = useNavigate();
  const currentPath = window.location.pathname.replace("/", "") || "dashboard";
  const activePage = currentPath;

  return (
    <SidebarGroup className="mt-auto">
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = item.page === activePage;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={isActive}
                  onClick={() => navigate(`/${item.page}`)}
                  className={classNames(
                    "transition-colors duration-150",
                    isActive && "text-primary font-medium",
                  )}
                >
                  <Icon
                    className={classNames(
                      "size-4",
                      isActive ? "text-primary" : "text-muted-foreground",
                    )}
                  />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
