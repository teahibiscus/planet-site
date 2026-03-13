import Earth from "./earth";
import Mars from "./mars"; // Not needed for GLTF
import Jupiter from "./jupiter";
import Saturn from "./saturn";
import Mercury from "./mercury";
import Venus from "./venus";
import Uranus from "./uranus";
import Neptune from "./neptune";

export const planetModels = {
  earth: { type: "texture", component: Earth },
  mars: { type: "texture", component: Mars },
  jupiter: { type: "texture", component: Jupiter },
  saturn: { type: "texture", component: Saturn },
  mercury: { type: "texture", component: Mercury },
  venus: { type: "texture", component: Venus },
  uranus: { type: "texture", component: Uranus },
  neptune: { type: "texture", component: Neptune },
};
