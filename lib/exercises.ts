import { Exercise } from "./types";

/**
 * Video IDs were sourced via live web search against real, currently-indexed
 * YouTube videos from physical therapy / trainer channels (Ask Doctor Jo,
 * MedBridge, NASM, athletic trainers, etc.) rather than guessed.
 */
export const exercises: Record<string, Exercise> = {
  "calf-stretch": {
    id: "calf-stretch",
    name: "Standing Calf Stretch",
    category: "foot",
    dose: "2 x 30 sec each leg",
    cues: [
      "Stand facing a wall, step the affected foot back with the heel flat on the floor",
      "Keep the back knee straight for the upper calf, then slightly bent for the lower calf",
      "Lean into the wall until you feel a stretch — no bouncing",
    ],
    videoId: "YfjeXeiREic",
    timer: { seconds: 30, sets: 2 },
  },
  "plantar-fascia-stretch": {
    id: "plantar-fascia-stretch",
    name: "Seated Plantar Fascia Stretch",
    category: "foot",
    dose: "3 x 30 sec each foot",
    cues: [
      "Sit with the leg out straight, loop a towel or strap around the ball of the foot",
      "Gently pull the toes back toward the shin until you feel a stretch in the arch",
      "Hold steady — ease off if you feel sharp pain rather than a stretch",
    ],
    videoId: "A6xAC0RGGaQ",
    timer: { seconds: 30, sets: 3 },
  },
  "doorway-pec-stretch": {
    id: "doorway-pec-stretch",
    name: "Doorway Pec Stretch",
    category: "shoulder",
    dose: "2 x 30 sec each side",
    cues: [
      "Stand in a doorway with forearms on the frame, elbows at shoulder height",
      "Step one foot through the doorway and lean forward gently",
      "Stop at a mild stretch across the chest, not pain",
    ],
    videoId: "M850sCj9LHQ",
    timer: { seconds: 30, sets: 2 },
  },
  "sleeper-stretch": {
    id: "sleeper-stretch",
    name: "Cross-Body / Sleeper Shoulder Stretch",
    category: "shoulder",
    dose: "2 x 30 sec each side",
    cues: [
      "Lie on the affected shoulder, arm out at 90 degrees, elbow bent",
      "Use the other hand to gently press the forearm down toward the floor",
      "Stop well short of any pinching pain at the front of the shoulder",
    ],
    videoId: "9BN8bRVq3Xo",
    timer: { seconds: 30, sets: 2 },
  },
  "ankle-pumps-circles": {
    id: "ankle-pumps-circles",
    name: "Ankle Pumps & Circles",
    category: "foot",
    dose: "10 reps each direction, both ankles",
    cues: [
      "While still sitting or lying down, point toes up then down 10 times",
      "Circle each ankle slowly, 10 times in each direction",
      "Do this before any weight-bearing, first thing in the morning",
    ],
    videoId: "7l_r2LBD2t4",
  },
  "foot-ball-roll": {
    id: "foot-ball-roll",
    name: "Foot Arch Roll",
    category: "foot",
    dose: "1-2 min each foot",
    cues: [
      "Roll a frozen water bottle, lacrosse ball, or roller under the arch",
      "Use light-to-moderate pressure, pausing on tender spots",
      "Avoid rolling directly on the heel bone if it's acutely painful",
    ],
    videoId: "jvEIVnZsBNw",
    timer: { seconds: 60, sets: 2 },
  },
  "bodyweight-squat": {
    id: "bodyweight-squat",
    name: "Bodyweight Squat",
    category: "strength",
    dose: "3 x 12 reps",
    cues: [
      "Feet shoulder-width apart, chest up, weight in your heels",
      "Lower until thighs are roughly parallel to the floor",
      "Drive through the heels to stand back up",
    ],
    videoId: "P-yaD24bUE8",
    trackWeight: true,
  },
  "forward-lunge": {
    id: "forward-lunge",
    name: "Forward Lunge",
    category: "strength",
    dose: "3 x 10 reps each leg",
    cues: [
      "Step forward and lower the back knee toward the floor",
      "Front knee stays over the ankle, not past the toes",
      "Push through the front heel to return to standing",
    ],
    videoId: "g8-Ge9S0aUw",
    trackWeight: true,
  },
  "glute-bridge": {
    id: "glute-bridge",
    name: "Glute Bridge",
    category: "strength",
    dose: "3 x 15 reps",
    cues: [
      "Lie on your back, knees bent, feet flat on the floor",
      "Squeeze the glutes to lift hips into a straight line, knee to shoulder",
      "Lower with control — don't let the low back overarch",
    ],
    videoId: "Q_Bpj91Yiis",
    trackWeight: true,
  },
  "standing-calf-raise": {
    id: "standing-calf-raise",
    name: "Standing Calf Raise",
    category: "strength",
    dose: "3 x 15 reps",
    cues: [
      "Stand tall, feet hip-width apart",
      "Rise onto the balls of both feet and pause at the top",
      "Lower slowly under control",
    ],
    videoId: "4HQ8Am9IuME",
    trackWeight: true,
  },
  "towel-scrunch": {
    id: "towel-scrunch",
    name: "Towel Scrunch",
    category: "foot",
    dose: "2 x 20 reps each foot",
    cues: [
      "Place a towel flat on the floor, foot on top",
      "Use your toes to scrunch the towel toward you",
      "Reset and repeat, keeping the heel on the ground",
    ],
    videoId: "1ogSryKJXB4",
  },
  "marble-pickup": {
    id: "marble-pickup",
    name: "Marble Pickup",
    category: "foot",
    dose: "1 set, ~20 marbles each foot",
    cues: [
      "Scatter marbles on the floor near a small bowl",
      "Pick up one marble at a time using only your toes",
      "Focus on control, not speed",
    ],
    videoId: "kC4DQPSj22E",
  },
  "cardio-session": {
    id: "cardio-session",
    name: "Cardio Session",
    category: "cardio",
    dose: "30-40 min, easy-to-moderate pace",
    cues: [
      "Choose a low-impact option: brisk walk, bike, or elliptical",
      "Keep a pace where you can still hold a conversation",
      "Wear supportive, cushioned shoes given the plantar fasciitis",
    ],
    timer: { seconds: 1800, sets: 1 },
  },
  "band-pull-apart": {
    id: "band-pull-apart",
    name: "Band Pull-Apart",
    category: "shoulder",
    dose: "3 x 15 reps",
    cues: [
      "Hold a resistance band at chest height, arms extended",
      "Pull the band apart by squeezing the shoulder blades together",
      "Return with control — don't let the band snap back",
    ],
    videoId: "smSSXITNpCI",
  },
  "wall-slide": {
    id: "wall-slide",
    name: "Wall Slide",
    category: "shoulder",
    dose: "2 x 10 reps",
    cues: [
      "Back flat against a wall, arms in a 'goalpost' position",
      "Slide arms upward, keeping elbows and wrists on the wall",
      "Lower with control, don't let the low back arch off the wall",
    ],
    videoId: "Eaj_NG5_hIo",
  },
  "arm-circles": {
    id: "arm-circles",
    name: "Arm Circles",
    category: "shoulder",
    dose: "20 sec forward + 20 sec backward",
    cues: [
      "Arms out to the sides at shoulder height",
      "Small, controlled circles — forward, then backward",
      "Increase the circle size gradually as the shoulder warms up",
    ],
    videoId: "mwDgFY86zck",
    timer: { seconds: 20, sets: 2 },
  },
  "eccentric-heel-drop": {
    id: "eccentric-heel-drop",
    name: "Eccentric Heel Drop",
    category: "foot",
    dose: "3 x 15 reps each leg",
    cues: [
      "Hold a wall or rail for balance — this is a strength exercise, not a balance test",
      "Stand with the balls of both feet on a step, heels hanging off",
      "Rise onto toes with both feet, then shift weight to the affected foot",
      "Slowly lower that heel below the step over 3-4 seconds",
    ],
    videoId: "5nc36z_Zt-Q",
  },
  "single-leg-balance": {
    id: "single-leg-balance",
    name: "Single-Leg Balance",
    category: "foot",
    dose: "3 x 30 sec each leg",
    cues: [
      "Stand near a wall or counter you can touch if you wobble",
      "Slight bend in the knee, keep hips level",
      "Engage the standing foot's arch",
      "Progress by closing your eyes only once this feels easy",
    ],
    videoId: "Dtgh2_LFkBQ",
    timer: { seconds: 30, sets: 3 },
  },
  "push-up": {
    id: "push-up",
    name: "Push-Up",
    category: "strength",
    dose: "3 x 8-12 reps",
    cues: [
      "Hands under shoulders, body in a straight line head-to-heels",
      "Lower the chest toward the floor, elbows at about 45 degrees",
      "Press back up without letting the hips sag",
    ],
    videoId: "WDIpL0pjun0",
  },
  "dumbbell-row": {
    id: "dumbbell-row",
    name: "Dumbbell Bent-Over Row",
    category: "strength",
    dose: "3 x 12 reps each arm",
    cues: [
      "Hinge at the hips, flat back, dumbbell hanging straight down",
      "Pull the dumbbell toward your hip, squeezing the shoulder blade back",
      "Lower with control, avoid twisting the torso",
    ],
    videoId: "dfkco3keMns",
    trackWeight: true,
  },
  "band-external-rotation": {
    id: "band-external-rotation",
    name: "Band External Rotation",
    category: "shoulder",
    dose: "3 x 15 reps each arm",
    cues: [
      "Elbow tucked to your side at 90 degrees, band anchored in front",
      "Rotate the forearm outward, keeping the elbow pinned to your side",
      "Return slowly, resisting the band the whole way",
    ],
    videoId: "_UvmPNGtlPM",
  },
  plank: {
    id: "plank",
    name: "Plank",
    category: "strength",
    dose: "3 x 30-45 sec",
    cues: [
      "Forearms and toes on the floor, body in a straight line",
      "Brace the core and squeeze glutes — don't let hips sag or pike up",
      "Breathe steadily throughout the hold",
    ],
    videoId: "mwlp75MS6Rg",
    timer: { seconds: 30, sets: 3 },
  },
  "hip-flexor-stretch": {
    id: "hip-flexor-stretch",
    name: "Kneeling Hip Flexor Stretch",
    category: "flexibility",
    dose: "2 x 30 sec each side",
    cues: [
      "Kneel on one knee in a half-kneeling position",
      "Tuck the pelvis under and shift weight forward gently",
      "Keep the torso upright — stretch should be felt at the front of the hip",
    ],
    videoId: "KT0HlPGCl6k",
    timer: { seconds: 30, sets: 2 },
  },
  "hamstring-stretch": {
    id: "hamstring-stretch",
    name: "Standing Hamstring Stretch",
    category: "flexibility",
    dose: "2 x 30 sec each leg",
    cues: [
      "Place the heel on a low chair or step, leg straight, toes up",
      "Hinge forward from the hips, keeping the back flat",
      "Stop at a stretch behind the thigh, not the knee",
    ],
    videoId: "LVY692zJK0A",
    timer: { seconds: 30, sets: 2 },
  },
  "cat-cow-stretch": {
    id: "cat-cow-stretch",
    name: "Cat-Cow Stretch",
    category: "flexibility",
    dose: "1 x 10 slow reps",
    cues: [
      "Start on hands and knees, wrists under shoulders",
      "Inhale, drop the belly, lift chest and tailbone (cow)",
      "Exhale, round the spine, tuck chin and tailbone (cat)",
    ],
    videoId: "xyNwxiuERXc",
  },
};

export function getExercise(id: string): Exercise {
  const exercise = exercises[id];
  if (!exercise) {
    throw new Error(`Unknown exercise id: ${id}`);
  }
  return exercise;
}
