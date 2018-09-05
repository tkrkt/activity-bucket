import { withContext } from "recompose";
import PropTypes from "prop-types";
import { Context } from "../context";

export const provide = (context: Context<any, any>) => {
  return withContext({ context: PropTypes.any }, () => ({ context }));
};
