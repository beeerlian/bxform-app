/* eslint-disable */

import { NavLink, useLocation } from "react-router-dom";
// chakra imports
import { Box, Flex, HStack, Text, useColorModeValue } from "@chakra-ui/react";
import sidemenuRoutes from "routes/sidemenu";

export function SidebarLinks() {
  //   Chakra color mode
  let location = useLocation();
  let activeColor = useColorModeValue("gray.700", "white");
  let inactiveColor = useColorModeValue(
    "secondaryGray.600",
    "secondaryGray.600"
  );
  let activeIcon = useColorModeValue("brand.500", "white");
  let textColor = useColorModeValue("secondaryGray.500", "white");
  let brandColor = useColorModeValue("brand.500", "brand.400");

  // verifies if routeName is the one active (in browser input)

  // this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
  const createLinks = (routes: RoutesType[]) => {
    return sidemenuRoutes.map((route: SideMenuItemType, index: number) => {
      // if (route.layout === '/admin' || route.layout === '/auth' || route.layout === '/rtl') {
      return (
        <NavLink key={index} to={route.path}>
          {route.icon ? (
            <Box>
              <HStack spacing={"26px"} py="5px" ps="10px">
                <Flex w="100%" alignItems="center" justifyContent="center">
                  <Box color={activeIcon} me="18px">
                    {route.icon}
                  </Box>
                  <Text me="auto" color={activeColor} fontWeight={"bold"}>
                    {route.name}
                  </Text>
                </Flex>
                <Box h="36px" w="4px" bg={brandColor} borderRadius="5px" />
              </HStack>
            </Box>
          ) : (
            <Box>
              <HStack spacing={"26px"} py="5px" ps="10px">
                <Text me="auto" color={inactiveColor} fontWeight={"bold"}>
                  {route.name}
                </Text>
                <Box h="36px" w="4px" bg="brand.400" borderRadius="5px" />
              </HStack>
            </Box>
          )}
        </NavLink>
      );
    });
  };
  //  BRAND
  return <>{createLinks(sidemenuRoutes)}</>;
}

export default SidebarLinks;
