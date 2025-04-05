const fruitCategories = [
    {
      id: 0,
      category: "Fruits",
      isChecked: false,
      children: [
        {
          id: 1,
          category: "Citrus Fruits",
          isChecked: false,
          children: [
            {
              id: 101,
              name: "Orange",
              isChecked: false,
            },
            {
              id: 102,
              name: "Lemon",
              isChecked: false,
            },
            {
              id: 103,
              name: "Lime",
              isChecked: false,
            },
          ],
        },
        {
          id: 2,
          category: "Berries",
          isChecked: false,
  
          children: [
            {
              id: 201,
              name: "Strawberry",
              isChecked: false,
            },
            {
              id: 202,
              name: "Blueberry",
              isChecked: false,
            },
            {
              id: 203,
              name: "Raspberry",
              isChecked: false,
            },
          ],
        },
        {
          id: 3,
          category: "Tropical Fruits",
          isChecked: false,
          children: [
            {
              id: 301,
              name: "Mango",
              isChecked: false,
            },
            {
              id: 302,
              name: "Pineapple",
              isChecked: false,
            },
            {
              id: 303,
              name: "Banana",
              isChecked: false,
            },
          ],
        },
      ],
    },
  ];
  
  export default fruitCategories;
  