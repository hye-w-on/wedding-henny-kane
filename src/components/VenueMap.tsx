import styled from "@emotion/styled";

const MapContainer = styled.div({
  width: "300px",
  height: "320px",
  borderRadius: "150px",
});

function VenueMap() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <MapContainer
        id="daumRoughmapContainer1736315825113"
        className="root_daum_roughmap root_daum_roughmap_landing"
      />
    </div>
  );
}

export default VenueMap;
