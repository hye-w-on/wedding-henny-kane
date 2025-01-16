import styled from "@emotion/styled";

const OuterContainer = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  backgroundColor: "#121212",
});

const Border = styled.div({
  position: "absolute",
  width: "304px",
  height: "304px",
  borderRadius: "152px",
  boxShadow: "inset 0 0 8px 15px #121212",
  zIndex: "2",
  borber: "4px solid #121212",
  // backdropFilter: "blur(2px)",
});

const MapContainer = styled.div({
  position: "absolute",
  width: "300px",
  height: "300px",
  borderRadius: "150px",
  zIndex: "1",
});

function VenueMap() {
  return (
    <OuterContainer>
      <Border />
      <MapContainer
        id="daumRoughmapContainer1736315825113"
        className="root_daum_roughmap root_daum_roughmap_landing"
      />
    </OuterContainer>
  );
}

export default VenueMap;
