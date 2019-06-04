import React from "react"
import { Box, Heading, Button, Text } from "grommet"
import { Send, Chat, Plan, Domain } from "grommet-icons"
import { navProps } from "../components/Header"

const BigNav = ({ label, to, Icon }) => (
  <Button
    {...navProps(to)}
    label={
      <Box align="center" pad="small" gap="small">
        <Icon size="large" />
        <Text>{label}</Text>
      </Box>
    }
  />
)

const Main = () => (
  <Box gap="medium">
    <Heading margin="none">Verktøy for ledere</Heading>
    <Box gap="medium" direction="row" justify="evenly" wrap>
      <BigNav to="/app/e-post" Icon={Send} label="Send e-post" />
      <BigNav to="/app/sms" Icon={Chat} label="Send SMS" />
      <BigNav to="/app/e-post" Icon={Plan} label="Terminliste" />
      <BigNav to="/admin/" Icon={Domain} label="Nettsider" />
    </Box>
  </Box>
)

export default Main
