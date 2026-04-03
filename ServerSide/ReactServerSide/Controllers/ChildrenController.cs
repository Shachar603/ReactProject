using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ReactServerSide.Controllers
{
    public class ChildrenController : Controller
    {
        // GET: ChildrenController
        public ActionResult Index()
        {
            return View();
        }

        // GET: ChildrenController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: ChildrenController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: ChildrenController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: ChildrenController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: ChildrenController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: ChildrenController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: ChildrenController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
