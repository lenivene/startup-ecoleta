import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import Constants from "expo-constants";
import { Feather as IconF } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { SvgUri } from "react-native-svg";

// Types
interface Item {
  id: number;
  title: string;
  image_url: string;
}
interface Point {
  id: number;
  image: string;
  name: string;
  latitude: number;
  longitude: number;
}
interface RouteParams {
  uf: string;
  city: string;
}

// Services
import api from "../../services/api";

const Points: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const routeParams = route.params as RouteParams;

  // Arrays empty to loads
  const [points, setPoints] = useState<Point[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [selectItems, setSelectItems] = useState<number[]>([]);
  const [initialMapPosition, setInitialMapPosition] = useState<
    [number, number]
  >([0, 0]);

  useEffect(() => {
    (async () => {
      // Request user permission
      const { status } = await Location.requestPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Ooops...",
          "Precisamos de sua permissão para obter a localização"
        );

        return false;
      }

      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;

      setInitialMapPosition([latitude, longitude]);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get("/items");

        if (response) {
          setItems(response.data);
        }
      } catch (error) {
        console.error("> Error: ", error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get("/points", {
          params: {
            city: routeParams.city,
            uf: routeParams.uf,
            items: selectItems,
          },
        });

        if (response) {
          setPoints(response.data);
        }
      } catch (error) {}
    })();
  }, [selectItems]);

  const handleNavigateBack = () => {
    navigation.goBack();
  };

  const handleNavigateToDetail = (point_id: number) => {
    navigation.navigate("Detail", { point_id });
  };

  const handleSelectItem = (id: number) => {
    const alreadySelected = selectItems.includes(id);

    if (alreadySelected) {
      const filteredItems = selectItems.filter((item) => item !== id);

      setSelectItems(filteredItems);
    } else {
      setSelectItems([...selectItems, id]);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <IconF name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>
        <Text style={styles.title}>Bem vindo.</Text>
        <Text style={styles.description}>
          Encontre no mapa um ponto de coleta.
        </Text>
        <View style={styles.mapContainer}>
          {initialMapPosition[0] !== 0 && (
            <MapView
              style={styles.map}
              loadingEnabled={initialMapPosition[0] === 0}
              initialRegion={{
                latitude: initialMapPosition[0],
                longitude: initialMapPosition[1],
                latitudeDelta: 0.014,
                longitudeDelta: 0.014,
              }}
            >
              {points.map((point) => (
                <Marker
                  key={String(point.id)}
                  style={styles.mapMarker}
                  coordinate={{
                    latitude: point.latitude,
                    longitude: point.longitude,
                  }}
                  onPress={() => {
                    handleNavigateToDetail(point.id);
                  }}
                >
                  <View style={styles.mapMarkerContainer}>
                    <Image
                      style={styles.mapMarkerImage}
                      source={{
                        uri: point.image,
                      }}
                    />
                    <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                  </View>
                </Marker>
              ))}
            </MapView>
          )}
        </View>
      </View>
      <View style={styles.itemsContainer}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 30 }}
        >
          {items.map((item) => {
            return (
              <TouchableOpacity
                key={String(item.id)}
                style={[
                  styles.item,
                  selectItems.includes(item.id) ? styles.selectedItem : {},
                ]}
                activeOpacity={0.6}
                onPress={() => {
                  handleSelectItem(item.id);
                }}
              >
                <SvgUri uri={item.image_url} width={42} height={42} />
                <Text style={styles.itemTitle}>{item.title}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },

  title: {
    fontSize: 20,
    fontFamily: "Ubuntu_700Bold",
    marginTop: 24,
  },

  description: {
    color: "#6C6C80",
    fontSize: 16,
    marginTop: 4,
    fontFamily: "Roboto_400Regular",
  },

  mapContainer: {
    flex: 1,
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 16,
  },

  map: {
    width: "100%",
    height: "100%",
  },

  mapMarker: {
    width: 90,
    height: 80,
  },

  mapMarkerContainer: {
    width: 90,
    height: 70,
    backgroundColor: "#34CB79",
    flexDirection: "column",
    borderRadius: 8,
    overflow: "hidden",
    alignItems: "center",
  },

  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: "cover",
  },

  mapMarkerTitle: {
    flex: 1,
    fontFamily: "Roboto_400Regular",
    color: "#FFF",
    fontSize: 13,
    lineHeight: 23,
  },

  itemsContainer: {
    flexDirection: "row",
    marginTop: 16,
    marginBottom: 32,
  },

  item: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#eee",
    height: 120,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "space-between",

    textAlign: "center",
  },

  selectedItem: {
    borderColor: "#34CB79",
    borderWidth: 2,
  },

  itemTitle: {
    fontFamily: "Roboto_400Regular",
    textAlign: "center",
    fontSize: 13,
  },
});

export default Points;
