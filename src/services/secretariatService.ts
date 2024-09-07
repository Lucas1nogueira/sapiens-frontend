import { Secretariat } from "types/secretariat";
import { api } from "./api";

export const findSecretratBySuperAdminId = async (id: string) => {
  const response = await api.get<Secretariat>(`/secretariat/admin/${id}`);
  return response;
};

export const updateSecretariat = async (secretariat: Secretariat) => {
  const response = await api.put("secretariat/update", secretariat);
  return response;
};

// @PostMapping("/save")
//     public ResponseEntity<?> save(@RequestBody Secretariat secretariat) {
//         return secretariatService.save(secretariat);
//     }

//     @PutMapping("/update")
//     public ResponseEntity<?> update(@RequestBody Secretariat secretariat) {
//         return secretariatService.update(secretariat);
//     }

//     @GetMapping("/all")
//     public ResponseEntity<?> findAll() {
//         return secretariatService.findAll();
//     }

//     @GetMapping("/name/{name}")
//     public ResponseEntity<?> findByName(@PathVariable("name") String name) {
//         return secretariatService.findByName(name);
//     }

//     @GetMapping("/school/{id}")
//     public ResponseEntity<?> findBySchoolsId(@PathVariable("id") Long id) {
//         return secretariatService.findBySchoolsId(id);
//     }

//     @GetMapping("/admin/{id}")
//     public ResponseEntity<?> findBySuperAdminId(@PathVariable("id") Long id) {
//         return secretariatService.findBySuperAdminId(id);
//     }
