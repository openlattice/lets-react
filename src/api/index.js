/*
 * @flow
 */

export default function(type) {
  return () => (
    fetch(`https://api.openlattice.com/datastore/edm/${type}/type`)
      .then(response => response.json())
      .catch((err) => {
        console.error(err);
        return false;
      })
  );
}
