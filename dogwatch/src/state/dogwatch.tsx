import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";

import { createActivities, createMembers, INITIAL_REMINDERS, LUNA } from "@/data/dogwatch";
import { Activity, ActivityType, Dog, Member, Reminder } from "@/types/dogwatch";

export interface DogWatchState {
  currentUser: Member;
  dog: Dog;
  members: Member[];
  activities: Activity[];
  reminders: Reminder[];
}

export type DogWatchAction =
  | {
      type: "logActivity";
      activityType: ActivityType;
      member: string;
      note?: string;
      timestamp?: Date;
    }
  | { type: "toggleReminder"; id: string }
  | { type: "reset"; state?: DogWatchState };

export function createInitialDogWatchState(now = new Date()): DogWatchState {
  const members = createMembers(now);

  return {
    currentUser: members[0],
    dog: LUNA,
    members,
    activities: createActivities(now),
    reminders: INITIAL_REMINDERS.map((reminder) => ({ ...reminder })),
  };
}

export function createLoggedActivity(
  state: DogWatchState,
  action: Extract<DogWatchAction, { type: "logActivity" }>,
): Activity {
  const timestamp = action.timestamp ?? new Date();
  const note = action.note?.trim() || undefined;

  return {
    id: `activity-${timestamp.getTime()}-${state.activities.length + 1}`,
    type: action.activityType,
    member: action.member,
    timestamp,
    note,
  };
}

export function dogWatchReducer(
  state: DogWatchState,
  action: DogWatchAction,
): DogWatchState {
  switch (action.type) {
    case "logActivity":
      return {
        ...state,
        activities: [createLoggedActivity(state, action), ...state.activities],
      };
    case "toggleReminder":
      return {
        ...state,
        reminders: state.reminders.map((reminder) =>
          reminder.id === action.id
            ? { ...reminder, enabled: !reminder.enabled }
            : reminder,
        ),
      };
    case "reset":
      return action.state ?? createInitialDogWatchState();
  }
}

interface DogWatchContextValue {
  state: DogWatchState;
  isQuickLogOpen: boolean;
  quickLogType?: ActivityType;
  logActivity: (type: ActivityType, note?: string) => void;
  toggleReminder: (id: string) => void;
  openQuickLog: (type?: ActivityType) => void;
  closeQuickLog: () => void;
  resetApp: () => void;
}

const DogWatchContext = createContext<DogWatchContextValue | undefined>(undefined);

export function DogWatchProvider({
  children,
  initialState,
}: PropsWithChildren<{ initialState?: DogWatchState }>) {
  const initialStateRef = useRef(initialState ?? createInitialDogWatchState());
  const [state, dispatch] = useReducer(dogWatchReducer, initialStateRef.current);
  const [quickLogType, setQuickLogType] = useState<ActivityType | undefined>();
  const [isQuickLogOpen, setIsQuickLogOpen] = useState(false);

  const logActivity = useCallback(
    (type: ActivityType, note?: string) => {
      dispatch({
        type: "logActivity",
        activityType: type,
        member: state.currentUser.name,
        note,
      });
    },
    [state.currentUser.name],
  );

  const toggleReminder = useCallback((id: string) => {
    dispatch({ type: "toggleReminder", id });
  }, []);

  const openQuickLog = useCallback((type?: ActivityType) => {
    setQuickLogType(type);
    setIsQuickLogOpen(true);
  }, []);

  const closeQuickLog = useCallback(() => {
    setIsQuickLogOpen(false);
    setQuickLogType(undefined);
  }, []);

  const resetApp = useCallback(() => {
    dispatch({ type: "reset", state: initialStateRef.current });
    closeQuickLog();
  }, [closeQuickLog]);

  const value = useMemo(
    () => ({
      state,
      isQuickLogOpen,
      quickLogType,
      logActivity,
      toggleReminder,
      openQuickLog,
      closeQuickLog,
      resetApp,
    }),
    [
      state,
      isQuickLogOpen,
      quickLogType,
      logActivity,
      toggleReminder,
      openQuickLog,
      closeQuickLog,
      resetApp,
    ],
  );

  return (
    <DogWatchContext.Provider value={value}>{children}</DogWatchContext.Provider>
  );
}

export function useDogWatch() {
  const context = useContext(DogWatchContext);
  if (!context) {
    throw new Error("useDogWatch must be used inside DogWatchProvider");
  }
  return context;
}
