import { Box, Tab, Tabs, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../state";
import Item from "./Item";

const Items = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const items = useSelector((state) => state.cart.items);
  const isNonMobile = useMediaQuery("min-width:600px");
  console.log("items", items);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getItems() {
    // const items = await fetch("http://localhost:1337/api/items?populate=img", {
    const items = await fetch("https://kicks-and-tees-production.up.railway.app/api/items?populate=img", {
      method: "GET",
    });
    const itemsJson = await items.json();
    dispatch(setItems(itemsJson.data));
  }

  useEffect(() => {
    getItems();
  }, []);

  const newArrivalsItems = items.filter(
    (item) => item.attributes.category === "newArrivals"
  );

  const shirtsItems = items.filter((item) => item.attributes.category === "shirts");

  const sneakersItems = items.filter(
    (item) => item.attributes.category === "sneakers"
  );

  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textalign="center">
        FEATURED <b>PRODUCTS</b>
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: isNonMobile ? "block" : "none" } }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label="ALL" value="all" />
        <Tab label="NEW ARRIVALS" value="newArrivals" />
        <Tab label="SHIRTS" value="shirts" />
        <Tab label="SNEAKERS" value="sneakers" />
      </Tabs>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {value === 'all' && items.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`}/>
        ))}
        {value === 'newArrivals' && newArrivalsItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`}/>
        ))}
        {value === 'shirts' && shirtsItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`}/>
        ))}
        {value === 'sneakers' && sneakersItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`}/>
        ))}
      </Box>
    </Box>
  );
};

export default Items;
