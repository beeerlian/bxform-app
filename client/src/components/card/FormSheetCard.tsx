// Chakra imports
import {
  Box,
  Button,
  Flex,
  Image,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card";
// Assets
import Nft1 from "assets/img/nfts/Nft1.png";
import SurveyStatusChip from "components/chips/SurveyStatusChip";
import { useState } from "react";
import { SurveyStatus } from "types/dto-types";

export default function FormSheetCard(props: {
  title: string;
  startDate: string;
  endDate: string;
  category: string;
  status: SurveyStatus;
  totalResponse?: number;
}) {
  const { title, startDate, endDate, category, status, totalResponse } = props;
  const [like, setLike] = useState(false);
  const textColor = useColorModeValue("navy.700", "white");
  const textColorBid = useColorModeValue("brand.500", "white");
  return (
    <Card p="20px">
      <Flex direction={{ base: "column" }} justify="center">
        <Box mb={{ base: "20px", "2xl": "20px" }} position="relative">
          <Image
            src={Nft1}
            w={{ base: "100%", "3xl": "100%" }}
            h={{ base: "100%", "3xl": "100%" }}
            borderRadius="20px"
          />

          <Flex
            position="absolute"
            p="0px !important"
            top="14px"
            right="14px"
            borderRadius="50%"
          >
            <SurveyStatusChip status={status} />
          </Flex>
        </Box>
        <Flex flexDirection="column" justify="space-between" h="100%">
          <Flex
            justify="space-between"
            direction={{
              base: "row",
              md: "column",
              lg: "row",
              xl: "column",
              "2xl": "row",
            }}
            mb="auto"
          >
            <Flex direction="column">
              <Text
                color={textColor}
                fontSize={{
                  base: "xl",
                  md: "lg",
                  lg: "lg",
                  xl: "lg",
                  "2xl": "md",
                  "3xl": "lg",
                }}
                mb="5px"
                fontWeight="bold"
                me="14px"
              >
                {title}
              </Text>
            </Flex>
          </Flex>
          <Flex
            align={{
              base: "center",
              md: "start",
              lg: "center",
              xl: "start",
              "2xl": "center",
            }}
            justify="space-between"
            direction={{
              base: "row",
              md: "column",
              lg: "row",
              xl: "column",
              "2xl": "row",
            }}
            mt="25px"
          >
            {status === SurveyStatus.Active ? (
              <Text fontWeight="700" fontSize="sm" color={textColorBid}>
                Responses: {totalResponse}
              </Text>
            ) : null}
            <Link
              href="/forms/19"
              mt={{
                base: "0px",
                md: "10px",
                lg: "0px",
                xl: "10px",
                "2xl": "0px",
              }}
            >
              <Button
                variant="darkBrand"
                color="white"
                fontSize="sm"
                fontWeight="500"
                borderRadius="70px"
                px="24px"
                py="5px"
              >
                Open
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}