import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getCurrentCampaign } from "@/data/current-campaign";

export default function CampaignScreen() {
  const router = useRouter();
  const campaign = getCurrentCampaign();

  return (
    <SafeAreaView style={styles.container}>
      <View pointerEvents="none" style={styles.hazeOne} />
      <View pointerEvents="none" style={styles.hazeTwo} />
      <View pointerEvents="none" style={styles.grid} />

      <View style={styles.hero}>
        <Text style={styles.kicker}>Campaign Active</Text>
        <Text style={styles.title}>{campaign?.name ?? "No Active Campaign"}</Text>
        <Text style={styles.subtitle}>
          {campaign
            ? `Squad ready: ${campaign.stalkers.map((stalker) => stalker.name).join(", ")}`
            : "No campaign is loaded yet. Start a new campaign from the main menu first."}
        </Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.sectionLabel}>Operations</Text>

        <Pressable
          disabled={!campaign}
          onPress={() => router.push("/stash" as never)}
          style={[styles.button, !campaign && styles.buttonDisabled]}>
          <Text style={styles.buttonText}>Stash</Text>
        </Pressable>
      </View>
    </SafeAreaView>
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
  hazeOne: {
    position: "absolute",
    top: -30,
    right: -20,
    width: 220,
    height: 220,
    borderRadius: 999,
    backgroundColor: "rgba(126, 166, 106, 0.12)",
  },
  hazeTwo: {
    position: "absolute",
    bottom: 50,
    left: -70,
    width: 240,
    height: 240,
    borderRadius: 999,
    backgroundColor: "rgba(150, 92, 47, 0.12)",
  },
  grid: {
    position: "absolute",
    inset: 0,
    borderColor: "rgba(157, 178, 165, 0.05)",
    borderTopWidth: 1,
    borderLeftWidth: 1,
    margin: 20,
  },
  hero: {
    marginBottom: 28,
  },
  kicker: {
    color: "#7ea66a",
    fontSize: 12,
    letterSpacing: 1.6,
    marginBottom: 10,
    textTransform: "uppercase",
  },
  title: {
    color: "#edf3ee",
    fontSize: 30,
    fontWeight: "700",
  },
  subtitle: {
    color: "#a5b6ad",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 14,
    maxWidth: 330,
  },
  panel: {
    backgroundColor: "rgba(17, 24, 31, 0.9)",
    borderColor: "#22303a",
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
  },
  sectionLabel: {
    color: "#8b9992",
    fontSize: 12,
    letterSpacing: 1.4,
    marginBottom: 14,
    textTransform: "uppercase",
  },
  button: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#7ea66a",
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 11,
  },
  buttonDisabled: {
    opacity: 0.45,
  },
  buttonText: {
    color: "#08100a",
    fontSize: 14,
    fontWeight: "600",
  },
});
