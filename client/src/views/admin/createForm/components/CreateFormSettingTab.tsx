/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { useQuery } from "@apollo/client";
import {
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Skeleton,
  Switch,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { ROLES_QUERIES } from "services/apollo/Operations/Client/Queries";
import { Roles } from "__generated__/graphql";

// Custom components

// Assets

export default function CreateFormSettingTab() {
  // Chakra Color Mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const brandStars = useColorModeValue("brand.500", "brand.400");

  // External
  const toast = useToast();

  // State
  const [show, setShow] = React.useState(false);
  const [usePassword, setUsePassword] = React.useState(false);

  // Queries
  const roles = useQuery<{ roles: Roles[] }>(ROLES_QUERIES.getList());

  const handleClick = () => setShow(!show);
  return (
    <Flex direction="column" maxW="1000px">
      <FormControl>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap="20px">
          <div>
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Title<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="text"
              placeholder="Title"
              mb="24px"
              fontWeight="500"
              size="lg"
            />
          </div>
          <div>
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Target Audience
            </FormLabel>
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="text"
              placeholder="Total audience youre targeting"
              mb="24px"
              fontWeight="500"
              size="lg"
            />
          </div>
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap="20px">
          <div>
            <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              display="flex"
            >
              Start Form<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size="md">
              <Input
                isRequired={true}
                fontSize="sm"
                mb="24px"
                size="lg"
                type="datetime-local"
                variant="auth"
              />
            </InputGroup>
          </div>
          <div>
            <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              display="flex"
            >
              End in<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size="md">
              <Input
                isRequired={true}
                fontSize="sm"
                mb="24px"
                size="lg"
                type={"datetime-local"}
                variant="auth"
              />
            </InputGroup>
          </div>
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap="20px">
          <div>
            <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              display="flex"
            >
              Security<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size="md">
              <Switch
                isChecked={usePassword}
                onChange={(e) => {
                  setUsePassword(e.target.checked);
                }}
              />
              <FormLabel
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                display="flex"
              >
                Password<Text color={brandStars}>*</Text>
              </FormLabel>
            </InputGroup>

            <InputGroup size="md">
              <Input
                disabled={!usePassword}
                isRequired={true}
                fontSize="sm"
                placeholder="Min. 8 characters"
                mb="24px"
                size="lg"
                type={show ? "text" : "password"}
                variant="auth"
              />
              <InputRightElement display="flex" alignItems="center" mt="4px">
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
          </div>
          <div>
            <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              display="flex"
            >
              Audience Type<Text color={brandStars}>*</Text>
            </FormLabel>
            <Skeleton
              isLoaded={!roles.loading}
              height="100px"
              borderRadius={12}
            >
              {(roles.data?.roles ?? []).map((role) => (
                <InputGroup size="md">
                  <Switch />
                  <FormLabel
                    ms="4px"
                    fontSize="sm"
                    fontWeight="500"
                    color={textColor}
                    display="flex"
                  >
                    {role.name}
                  </FormLabel>
                </InputGroup>
              ))}
            </Skeleton>
            <Text
              mt={4}
              fontSize={"small"}
              fontStyle={"italic"}
              color={"red.500"}
            >
              *The selected role will be allowed to fill this form
            </Text>
          </div>
        </SimpleGrid>
      </FormControl>
    </Flex>
  );
}
