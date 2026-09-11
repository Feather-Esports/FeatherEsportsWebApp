import postcssNested from "postcss-nested"
import postcssSimpleVars from "postcss-simple-vars"

export default {
  plugins: {
    "postcss-simple-vars": postcssSimpleVars(),
    "postcss-nested": postcssNested(),
  },
}
