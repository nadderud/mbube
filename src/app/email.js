import React from "react"
import {
  Box,
  Tab,
  Tabs,
  Markdown,
  TextArea,
  Heading,
  Button,
  TextInput,
  Text,
} from "grommet"
import Members, {
  transformStateForSetItems,
  transformStateForToggleItem,
} from "./components/Members"

class Email extends React.Component {
  state = { selected: [], message: "", subject: "" }

  toggleSelected = (item) => this.setState(transformStateForToggleItem(item))
  setSelectedItems = (items, add) =>
    this.setState(transformStateForSetItems(items, add))
  changeHandler = (field) => (e) => this.setState({ [field]: e.target.value })

  render() {
    const { selected, subject, message } = this.state
    return (
      <Box gap="medium">
        <Heading margin="none">Send e-post</Heading>
        <Tabs>
          <Tab title="Skriv">
            <Box gap="xsmall">
              <TextInput
                value={subject}
                onChange={this.changeHandler("subject")}
                placeholder="Emne"
                required
              />
              <TextArea
                placeholder="Skriv meldingen her"
                value={message}
                rows={20}
                onChange={this.changeHandler("message")}
                required
              />
            </Box>
          </Tab>
          <Tab title="Forhåndsvis">
            <Box elevation="small" round="xsmall" border>
              <Box
                background="light-2"
                pad="medium"
                round={{ size: "xsmall", corner: "top" }}
              >
                <Text>
                  <strong>Emne: </strong>
                  {subject || "(uten emne)"}
                </Text>
              </Box>
              <Box pad="medium">
                <Markdown>{message || "*(du har ikke skrevet noe)*"}</Markdown>
              </Box>
            </Box>
          </Tab>
        </Tabs>
        <Members
          selected={selected}
          toggleSelected={this.toggleSelected}
          setSelectedItems={this.setSelectedItems}
        />
        <Button
          primary
          disabled={!selected.length || !subject.length || !message.length}
          label={<span>Send til {selected.length} mottakere</span>}
        />
      </Box>
    )
  }
}

export default Email
