const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const categoriesOption =  [
    { label: "Gender Parity", value: "Gender Parity" },
    {
      label: "Accesibility and Disability",
      value: "Accesibility and Disability",
    },
    { label: "Social Justice", value: "SociaL Justice" },
    { label: "Racism", value: "Racism" },
    { label: "LGBTI Inclusion", value: "LGBTI Inclusion" },
    { label: "Migration", value: "Migration" },
    { label: "Human Rights", value: "Human Rights" },
    { label: "Education and Skills", value: "Education and Skills" },
    { label: "Entrepreneurship", value: "Entrepreneurship" },
    { label: "Workforce and Employment", value: "Workforce and Employment" },
    { label: "Digital Transformation", value: "Digital Transformation" },
    { label: "Mental Health", value: "Mental Health" },
    { label: "Global Health", value: "Global Health" },
    { label: "Ageing", value: "Ageing" },
    { label: "Humanitarian Response", value: "Humanitarian Response" },
    { label: "Climate Change", value: "Climate Change" },
    { label: "Sustainable Development", value: "Sustainable Development" },
    { label: "Biodiversity", value: "Biodiversity" },
    { label: "Circular Economy", value: "Circular Economy" },
    { label: "Plastics", value: "Plastics" },
    { label: "Oceans", value: "Oceans" },
    { label: "Water", value: "Water" },
    { label: "Air Pollution", value: "Air Pollution" },
    { label: "Civic Participation", value: "Civic Participation" },
    { label: 'Input', value: 'input' },
  ];

  for (let cardData of categoriesOption) {
    await prisma.categories.create({
      data: {
        label: cardData.label,
        value: cardData.value,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
