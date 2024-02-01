let display = document.getElementById("display");

const appendValue = (value) => {
  display.value += value;
};

const clearScreen = () => {
  display.value = "";
};

const calculateAnswer = () => {
  try {
    display.value = math.evaluate(display.value);
    console.log(display.value);
  } catch (error) {
    display.value = "Invalid Syntax!";
  }
};

const deleteValue = () => {
  display.value = display.value.slice(0, -1);
};
