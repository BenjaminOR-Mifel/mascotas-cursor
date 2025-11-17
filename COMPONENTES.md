# Componentes y Vistas - Widget Mascotas

## 📋 Resumen

Este widget implementa un flujo completo de onboarding para registro de mascotas usando:
- **Vue 2.7** con `<script setup>`
- **Vuetify 2** para componentes UI
- **Tailwind** para estilos utilitarios
- **Pinia** para gestión de estado

---

## 🧩 Componentes Creados

### 1. **StepperProgress.vue**
Indicador visual de progreso del flujo de registro.

**Props:**
- `currentStep` (Number): Paso actual (1-4)
- `totalSteps` (Number): Total de pasos (default: 4)
- `steps` (Array): Configuración de pasos con label e icon

**Características:**
- Barra de progreso visual
- Íconos personalizados por paso
- Estados: completado, activo, pendiente

---

### 2. **PetTypeSelector.vue**
Selector visual de tipo de mascota.

**Props:**
- `modelValue` (String): Tipo seleccionado (v-model)

**Emits:**
- `update:modelValue`: Actualiza el valor seleccionado

**Tipos disponibles:**
- 🐕 Perro
- 🐈 Gato
- 🐦 Ave
- 🐰 Conejo
- 🐾 Otro

---

### 3. **PetCard.vue**
Tarjeta para mostrar información de una mascota.

**Props:**
- `pet` (Object): Datos de la mascota
- `clickable` (Boolean): Si es clickeable
- `selected` (Boolean): Si está seleccionada

**Emits:**
- `click`: Al hacer click en la tarjeta
- `edit`: Para editar mascota
- `delete`: Para eliminar mascota

**Características:**
- Muestra ícono según tipo
- Chips con información clave
- Acciones de edición/eliminación

---

### 4. **PetForm.vue**
Formulario completo para capturar datos de mascota.

**Props:**
- `modelValue` (Object): Datos del formulario (v-model)

**Emits:**
- `update:modelValue`: Actualiza los datos

**Secciones:**
- Selector de tipo (usa PetTypeSelector)
- Información básica (nombre, raza, edad, color, peso)
- Información de salud (vacunas, esterilización)
- Descripción adicional

**Validaciones:**
- Campos requeridos marcados con *
- Validación de edad positiva
- Límite de 500 caracteres en descripción
- Razas dinámicas según tipo seleccionado

---

## 📄 Páginas/Vistas Creadas

### 1. **PagePaso1.vue** - Bienvenida
**Ruta:** `/` (paso-1)

**Contenido:**
- Banner de bienvenida
- Beneficios del registro
- Timeline con pasos del proceso
- CTA para iniciar registro

---

### 2. **PagePaso2.vue** - Datos de Mascota
**Ruta:** `/paso-2` (paso-2)

**Contenido:**
- Formulario completo (PetForm)
- Validación de campos requeridos
- Navegación: Atrás / Continuar
- Almacena datos en Pinia store

---

### 3. **PagePaso3.vue** - Información Adicional
**Ruta:** `/paso-3` (paso-3)

**Contenido:**
- Upload de documentos (certificados, fotos)
- Contacto de emergencia
- Información del veterinario
- Todo es opcional

---

### 4. **PagePaso4.vue** - Confirmación
**Ruta:** `/paso-4` (paso-4)

**Contenido:**
- Vista previa de la mascota (PetCard)
- Tabla con detalles completos
- Checkbox de términos y condiciones
- Botón de confirmación final
- Simulación de registro con loading

---

### 5. **PageExito.vue** - Registro Exitoso
**Ruta:** `/exito` (exito)

**Contenido:**
- Mensaje de éxito con animación
- Vista de mascota registrada
- Información de confirmación
- Número de registro
- Acciones: descargar certificado, registrar otra, ver lista

---

### 6. **PageMisMascotas.vue** - Lista de Mascotas
**Ruta:** `/mis-mascotas` (mis-mascotas)

**Contenido:**
- Lista de todas las mascotas registradas
- Búsqueda por nombre/raza/tipo
- Filtro por tipo de mascota
- Acciones: editar, eliminar
- Dialog de confirmación para eliminar
- Empty state cuando no hay mascotas

---

## 🗃️ Store (Pinia)

### **mascotas.js**

**State:**
- `mascotas`: Array de mascotas registradas
- `currentStep`: Paso actual del flujo (1-4)
- `mascotaActual`: Datos temporales durante el registro

**Getters:**
- `totalMascotas`: Cantidad total de mascotas
- `tieneMascotas`: Boolean si tiene al menos una

**Actions:**
- `agregarMascota(mascota)`: Agrega nueva mascota
- `actualizarMascota(id, data)`: Actualiza mascota existente
- `eliminarMascota(id)`: Elimina una mascota
- `obtenerMascota(id)`: Obtiene mascota por ID
- `setMascotaActual(mascota)`: Establece mascota temporal
- `resetMascotaActual()`: Limpia datos temporales
- `nextStep()`, `prevStep()`, `setStep(n)`: Navegación de pasos
- `resetStore()`: Limpia todo el store

---

## 🛣️ Router

**Rutas configuradas:**

| Ruta | Nombre | Componente | Descripción |
|------|--------|------------|-------------|
| `/` | paso-1 | PagePaso1 | Bienvenida |
| `/paso-2` | paso-2 | PagePaso2 | Datos mascota |
| `/paso-3` | paso-3 | PagePaso3 | Info adicional |
| `/paso-4` | paso-4 | PagePaso4 | Confirmación |
| `/exito` | exito | PageExito | Éxito |
| `/mis-mascotas` | mis-mascotas | PageMisMascotas | Lista mascotas |

**Navigation Guard:**
- Actualiza título de la página según ruta

---

## 🎨 Estilos

- **Vuetify 2**: Componentes base y sistema de grillas
- **Tailwind**: Utilidades para spacing, colores, flex, grid
- **Prefijo tw-**: Todas las clases de Tailwind usan prefijo `tw-`
- **Responsivo**: Grid adapta de 1 columna (mobile) a múltiples (desktop)

---

## 🚀 Flujo de Usuario

1. **Inicio** → Usuario ve bienvenida y beneficios
2. **Paso 1** → Click en "Comenzar Registro"
3. **Paso 2** → Selecciona tipo y completa datos básicos
4. **Paso 3** → Agrega info opcional (docs, contactos)
5. **Paso 4** → Revisa y acepta términos
6. **Éxito** → Confirmación de registro
7. **Opciones finales:**
   - Descargar certificado
   - Registrar otra mascota
   - Ver lista de mascotas

---

## 📦 Dependencias Utilizadas

- `vue@2.7.16` - Framework principal
- `vuetify@2.7.2` - UI Components
- `tailwindcss@3.x` - Utility CSS
- `pinia@2.x` - State Management
- `vue-router@3.x` - Routing
- `vee-validate@3.x` - Form validation (disponible)
- `vue-i18n@8.x` - Internacionalización (disponible)

---

## 🔧 Características Técnicas

### Vue 2.7 Script Setup
- Uso de Composition API
- Sintaxis `<script setup>`
- `ref`, `computed`, `watch` de Vue
- `useRouter` de vue-router/composables

### Vuetify 2
- v-card, v-btn, v-icon
- v-text-field, v-select, v-textarea
- v-avatar, v-chip
- v-dialog, v-alert
- v-timeline
- Sistema de grid (v-row, v-col)

### Tailwind
- Flexbox y Grid
- Spacing (padding, margin)
- Colores y tipografía
- Transiciones y animaciones
- Responsive utilities (sm, md, lg)

---

## 📝 Próximas Mejoras

- [ ] Agregar validación con vee-validate
- [ ] Implementar i18n para multiidioma
- [ ] Agregar tests unitarios
- [ ] Integrar con API real
- [ ] Persistir datos en localStorage/API
- [ ] Agregar animaciones con transitions
- [ ] Implementar drag & drop para imágenes
- [ ] Agregar preview de imágenes subidas
- [ ] Crear dashboard con estadísticas
- [ ] Agregar calendario de vacunas

---

## 🐾 Nota Final

Todos los componentes están construidos con **Vue 2.7**, **Vuetify 2** y **Tailwind**, 
siguiendo las mejores prácticas y usando **`<script setup>`** para código limpio y moderno.


