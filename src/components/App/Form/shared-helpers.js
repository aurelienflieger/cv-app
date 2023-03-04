export const getCurrentImage = (section, isSelected) => {
  const image = require(`../../../assets/header-icons/${section}_${
    isSelected ? "selected" : "default"
  }.png`);
  return image;
};

export const localize = (date) => {
  return new Date(date).toLocaleDateString();
};
