import { c as createLucideIcon, j as jsxRuntimeExports, e as cn, o as useProfile, I as useSetUsername, r as reactExports, L as Label, J as Input, B as Button, w as ue } from "./index-B7gz-m_n.js";
import { C as Calendar } from "./calendar-D6Ag7Gkk.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-header",
      className: cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      ),
      ...props
    }
  );
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-title",
      className: cn("leading-none font-semibold", className),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
function formatIndonesianDate(ms) {
  return new Date(ms).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}
function Settings() {
  const { data: profile, isLoading } = useProfile();
  const setUsername = useSetUsername();
  const [username, setUsernameValue] = reactExports.useState("");
  const [isDirty, setIsDirty] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (profile == null ? void 0 : profile.username) {
      setUsernameValue(profile.username);
      setIsDirty(false);
    }
  }, [profile == null ? void 0 : profile.username]);
  const handleChange = (e) => {
    setUsernameValue(e.target.value);
    setIsDirty(e.target.value !== ((profile == null ? void 0 : profile.username) ?? ""));
  };
  const handleSave = async () => {
    if (!isDirty || !username.trim()) return;
    try {
      await setUsername.mutateAsync(username.trim());
      ue.success("Username berhasil diperbarui!");
      setIsDirty(false);
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Gagal memperbarui username."
      );
    }
  };
  const joinedAtMs = (profile == null ? void 0 : profile.joinedAt) ? Number(profile.joinedAt) / 1e6 : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex flex-col items-center py-12 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-lg space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold text-foreground tracking-tight", children: "Pengaturan" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Kelola informasi akun kamu" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card border border-border rounded-2xl overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "bg-card border-b border-border px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-base font-semibold text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 16, className: "text-muted-foreground" }),
        "Pengaturan Profil"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "bg-card px-6 py-6 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "username",
              className: "text-sm font-medium text-foreground",
              children: "Username"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "username",
              "data-ocid": "settings-username-input",
              value: username,
              onChange: handleChange,
              placeholder: "Masukkan username kamu",
              disabled: isLoading || setUsername.isPending,
              className: "transition-smooth rounded-xl border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:border-ring disabled:opacity-50 h-10 px-4 text-sm",
              maxLength: 20,
              autoComplete: "off"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Gunakan 3–20 karakter. Huruf, angka, dan garis bawah." })
        ] }),
        joinedAtMs !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 14 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Bergabung sejak:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: formatIndonesianDate(joinedAtMs) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            "data-ocid": "settings-save-btn",
            onClick: handleSave,
            disabled: !isDirty || !username.trim() || setUsername.isPending || isLoading,
            className: "h-10 px-6 rounded-xl text-sm font-medium transition-smooth bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed",
            children: setUsername.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  role: "status",
                  "aria-label": "Memuat",
                  className: "inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                }
              ),
              "Menyimpan…"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 14 }),
              "Simpan Perubahan"
            ] })
          }
        ) })
      ] })
    ] })
  ] }) });
}
export {
  Settings as default
};
