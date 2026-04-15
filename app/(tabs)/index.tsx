import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type Player = {
  id: string;
  name: string;
};

export default function HomeScreen() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [name, setName] = useState("");

  const addPlayer = () => {
    const trimmedName = name.trim();

    if (trimmedName === "") return;

    const hasDuplicateName = players.some(
      (player) => player.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (hasDuplicateName) {
      Alert.alert("Player already exists", "Choose a different player name.");
      return;
    }

    setPlayers((currentPlayers) => [
      ...currentPlayers,
      { id: `${Date.now()}-${trimmedName}`, name: trimmedName },
    ]);
    setName("");
  };

  return (
    <View style={styles.container}>
      <View pointerEvents="none" style={styles.glow} />

      <Text style={styles.kicker}>Roster Management</Text>
      <Text style={styles.title}>S.T.A.L.K.E.R. Campaign App</Text>

      <View style={styles.panel}>
        <Text style={styles.label}>Add Player</Text>

        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter name"
          placeholderTextColor="#6f8078"
          style={styles.input}
        />

        <Pressable onPress={addPlayer} style={styles.button}>
          <Text style={styles.buttonText}>Add Player</Text>
        </Pressable>
      </View>

      <View style={styles.panel}>
        <Text style={styles.playersHeading}>Players</Text>

        {players.length === 0 ? (
          <Text style={styles.emptyState}>No stalkers registered yet.</Text>
        ) : (
          players.map((player) => (
            <Text key={player.id} style={styles.playerItem}>
              - {player.name}
            </Text>
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c1116",
    overflow: "hidden",
    padding: 28,
    paddingTop: 72,
  },
  glow: {
    position: "absolute",
    top: 30,
    right: -40,
    width: 180,
    height: 180,
    borderRadius: 999,
    backgroundColor: "rgba(126, 166, 106, 0.1)",
  },
  kicker: {
    color: "#7ea66a",
    fontSize: 12,
    letterSpacing: 1.5,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  title: {
    color: "#edf3ee",
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 18,
  },
  panel: {
    backgroundColor: "rgba(17, 24, 31, 0.9)",
    borderColor: "#22303a",
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 16,
    padding: 18,
  },
  label: {
    color: "#9db2a5",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#11181f",
    borderColor: "#22303a",
    borderWidth: 1,
    color: "#edf3ee",
    marginBottom: 10,
    padding: 8,
  },
  button: {
    alignSelf: "flex-start",
    backgroundColor: "#7ea66a",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  buttonText: {
    color: "#08100a",
    fontSize: 14,
    fontWeight: "600",
  },
  playersHeading: {
    color: "#9db2a5",
    marginBottom: 8,
  },
  emptyState: {
    color: "#6f8078",
    fontStyle: "italic",
  },
  playerItem: {
    color: "#edf3ee",
    marginBottom: 4,
  },
});
